import express from 'express';
import mongoose from 'mongoose';

import {
    loginValidation,
    refuelValidation,
    registerValidation,
} from './validations.js';
import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as MachineController from './controllers/MachineController.js';
import * as ProductController from './controllers/ProductController.js';

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

app.post('/auth/login', loginValidation, UserController.login);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post(
    '/users/:userId/refuel',
    checkAuth,
    refuelValidation,
    UserController.refuel
);

app.get('/machines', MachineController.getMachines);
app.post('/machines/:number/book', checkAuth, MachineController.bookMachine);
app.post(
    '/machines/:number/release',
    checkAuth,
    MachineController.releaseMachine
);

app.get('/products', ProductController.getProducts);
app.get('/products/:productId', ProductController.getProduct);
app.post(
    '/products/:productId/order',
    checkAuth,
    ProductController.orderProduct
);

app.listen(2222, (err) => {
    if (err) return console.log(err);

    console.log('Server OK');
});
