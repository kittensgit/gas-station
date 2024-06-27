import UserModel from '../models/User.js';
import ShowerModel from '../models/Shower.js';

export const getShowers = async (req, res) => {
    try {
        const showers = await ShowerModel.find().populate('occupied.user');
        if (!showers)
            return res.status(404).json({
                message: 'Showers not found',
            });

        res.json(showers);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get showers',
        });
    }
};

export const bookShower = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.scores >= 6) {
            const shower = await ShowerModel.findById(req.params.showerId);

            if (!shower)
                return res.status(404).json({
                    message: 'Shower not found',
                });

            if (shower.occupied.user)
                return res.status(400).json({
                    message: `Shower is already occupied by user`,
                });

            shower.occupied = {
                user: userId,
            };

            await shower.save();

            user.scores = user.scores - 3;

            await user.save();
        } else {
            return res
                .status(400)
                .json({ message: "You don't have enough points" });
        }
        res.json({
            message: 'Shower booked successfully and you spent 6 points',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get shower',
        });
    }
};

export const releaseShower = async (req, res) => {
    try {
        const shower = await ShowerModel.findById(req.params.showerId);

        if (!shower)
            return res.status(404).json({
                message: 'shower not found',
            });

        if (shower.occupied.user.equals(req.userId)) {
            shower.occupied = {
                user: null,
            };
            await shower.save();
        } else {
            return res.status(400).json({
                message: "You can't release shower",
            });
        }

        res.json({
            message: 'Shower released successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to release shower',
        });
    }
};

export const deleteShower = async (req, res) => {
    try {
        const shower = await ShowerModel.findByIdAndDelete(req.params.showerId);
        if (!shower)
            return res.status(404).json({
                message: 'Shower not found',
            });
        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to remove shower',
        });
    }
};
