import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        scores: {
            type: Number,
            default: 0,
        },
        refuelingHistory: [
            {
                stationName: {
                    type: String,
                    required: true,
                },
                litersFilled: {
                    type: Number,
                    required: true,
                },
                cost: {
                    type: Number,
                    required: true,
                },
                refuelDate: {
                    type: Date,
                    default: Date.now(),
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);
