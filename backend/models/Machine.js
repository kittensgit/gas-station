import mongoose from 'mongoose';

const MachineSchema = new mongoose.Schema(
    {
        occupied: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                default: null,
            },
            bookedAt: { type: Date, default: null },
            bookedUntil: { type: Date, default: null },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Machine', MachineSchema);
