import mongoose from 'mongoose';

const MachineSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
            unique: true,
        },
        occupied: {
            userId: {
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
