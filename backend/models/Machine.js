import mongoose from 'mongoose';

const MachineSchema = new mongoose.Schema(
    {
        occupied: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                default: null,
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Machine', MachineSchema);
