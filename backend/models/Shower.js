import mongoose from 'mongoose';

const ShowerSchema = new mongoose.Schema(
    {
        number: {
            type: Number,
            required: true,
            unique: true,
        },
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
