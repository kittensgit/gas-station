import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import UserModel from './models/User.js';
import { registerValidation } from './validations/auth.js';

mongoose
    .connect(
        'mongodb+srv://Nika:wwwwww@cluster.bw68ue0.mongodb.net/gas_station?retryWrites=true&w=majority&appName=Cluster'
    )
    .then(() => {
        console.log('DB OK');
    })
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json(errors.array().map((item) => item.msg));

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = createToken(user._id);

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to register',
        });
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email,
        });
        if (!user)
            return res.status(404).json({
                message: 'User not found',
            });

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );
        if (!isValidPass)
            return req.status(400).json({
                message: 'Invalid password or email',
            });

        const token = createToken(user._id);

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to login',
        });
    }
});

app.listen(2222, (err) => {
    if (err) return console.log(err);

    console.log('Server OK');
});

const createToken = (id) => {
    const token = jwt.sign(
        {
            _id: id,
        },
        'secret123',
        {
            expiresIn: '365d',
        }
    );
    return token;
};
