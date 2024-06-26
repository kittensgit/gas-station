import { validationErrors } from '../helpers.js';
import UserModel from '../models/User.js';
import MachineModel from '../models/Machine.js';

export const getMachines = async (req, res) => {
    try {
        const machines = await MachineModel.find();

        if (!machines)
            return res.status(404).json({
                message: 'Machines not found',
            });

        res.json(machines);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get machines',
        });
    }
};

export const bookMachine = async (req, res) => {
    try {
        const validationRes = validationErrors(req, res);
        if (validationRes) return;

        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.scores < 3) {
            const machine = await MachineModel.findOne({
                number: req.params.number,
            });

            if (!machine)
                return res.status(404).json({
                    message: 'Machine not found',
                });

            if (machine.occupied.userId)
                return res.status(400).json({
                    message: `Machine is already occupied by user`,
                });

            machine.occupied = {
                userId,
            };

            await machine.save();

            user.scores = user.scores - 3;

            await user.save();

            res.json({
                message: 'Machine booked successfully and you spent 3 points',
            });
        } else {
            res.status(400).json({ message: "You don't have enough points" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get machine',
        });
    }
};

export const releaseMachine = async (req, res) => {
    try {
        const validationRes = validationErrors(req, res);
        if (validationRes) return;

        const machine = await MachineModel.findOne({
            number: req.params.number,
        });

        if (!machine)
            return res.status(404).json({
                message: 'Machine not found',
            });

        if (machine.occupied.userId.equals(req.body.userId)) {
            machine.occupied = {
                userId: null,
            };
            await machine.save();
        } else {
            return res.status(400).json({
                message: "You can't release machine",
            });
        }

        res.json({
            message: 'Machine released successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to release machine',
        });
    }
};
