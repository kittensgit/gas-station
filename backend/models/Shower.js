import mongoose from 'mongoose';

const ShowerSchema = new mongoose.Schema(
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

export default mongoose.model('Shower', ShowerSchema);
