import cron from 'node-cron';

import UserModel from '../models/User.js';
import MachineModel from '../models/Machine.js';

export const getMachines = async (req, res) => {
    try {
        const machines = await MachineModel.find().populate('occupied.user');

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
        const userId = req.userId;

        const user = await UserModel.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.scores >= 1000) {
            const machine = await MachineModel.findById(req.params.machineId);

            if (!machine)
                return res.status(404).json({
                    message: 'Machine not found',
                });

            if (machine.occupied.user)
                return res.status(400).json({
                    message: `Machine is already occupied by user`,
                });

            const bookedAt = new Date();
            const bookedUntil = new Date(
                bookedAt.getTime() + 3 * 60 * 60 * 1000
            ); // 3 часа

            machine.occupied = {
                user: userId,
                bookedAt,
                bookedUntil,
            };

            await machine.save();

            user.scores = user.scores - 1000;

            await user.save();
        } else {
            return res
                .status(400)
                .json({ message: "You don't have enough points" });
        }
        res.json({
            message: 'Machine booked successfully and you spent 1000 points',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to get machine',
        });
    }
};

cron.schedule('* * * * * *', async () => {
    // Задача запускается каждую минуту
    try {
        const now = new Date();
        const machines = await MachineModel.find({
            'occupied.bookedUntil': { $lte: now },
        });

        for (const machine of machines) {
            machine.occupied = {
                user: null,
                bookedAt: null,
                bookedUntil: null,
            };
            await machine.save();
        }
    } catch (error) {
        console.error('Failed to execute task:', error);
    }
});

export const releaseMachine = async (req, res) => {
    try {
        const machine = await MachineModel.findById(req.params.machineId);

        if (!machine)
            return res.status(404).json({
                message: 'Machine not found',
            });

        machine.occupied = {
            user: null,
            bookedAt: null,
            bookedUntil: null,
        };

        await machine.save();

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

// admin

export const deleteMachine = async (req, res) => {
    try {
        const machine = await MachineModel.findByIdAndDelete(
            req.params.machineId
        );
        if (!machine)
            return res.status(404).json({
                message: 'Machine not found',
            });
        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to remove machine',
        });
    }
};

export const addMachine = async (req, res) => {
    try {
        for (let i = 1; i <= req.body.quantity; i++) {
            const newMachine = new MachineModel();
            await newMachine.save();
        }
        res.json({
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to add machine',
        });
    }
};
