import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';

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

app.post('/auth/register', registerValidation, UserController.register);

app.post('/auth/login', UserController.login);

app.get('/auth/me', checkAuth, UserController.getMe);

app.listen(2222, (err) => {
    if (err) return console.log(err);

    console.log('Server OK');
});
