import express from 'express';
import mongoose from 'mongoose';

import {
    loginValidation,
    refuelValidation,
    registerValidation,
    orderProductValidation,
} from './validations.js';

import {
    MachineController,
    OrderedProductController,
    ProductController,
    ShowerController,
    UserController,
} from './controllers/index.js';

import {
    checkAdmin,
    checkAuth,
    handleValidationErrors,
} from './utils/index.js';

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

app.post(
    '/auth/register',
    registerValidation,
    handleValidationErrors,
    UserController.register
);

app.post(
    '/auth/login',
    loginValidation,
    handleValidationErrors,
    UserController.login
);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post(
    '/users/:userId/refuel',
    checkAuth,
    refuelValidation,
    handleValidationErrors,
    UserController.refuel
);

app.get('/machines', MachineController.getMachines);
app.get('/machines/:machineId/book', checkAuth, MachineController.bookMachine);
app.get(
    '/machines/:machineId/release',
    checkAuth,
    MachineController.releaseMachine
);
app.delete(
    '/machines/:machineId',
    checkAuth,
    checkAdmin,
    MachineController.deleteMachine
);

app.get('/showers', ShowerController.getShowers);
app.get('/showers/:number/book', checkAuth, ShowerController.bookShower);
app.get('/showers/:number/release', checkAuth, ShowerController.releaseShower);

app.get('/products', ProductController.getProducts);
app.get('/products/:productId', ProductController.getProduct);
app.post(
    '/products/:productId/order',
    checkAuth,
    orderProductValidation,
    handleValidationErrors,
    OrderedProductController.orderProduct
);

app.get(
    '/orders',
    checkAuth,
    checkAdmin,
    OrderedProductController.getAllOrders
);
app.get(
    '/orders/:orderId',
    checkAuth,
    checkAdmin,
    OrderedProductController.getOrder
);

app.listen(2222, (err) => {
    if (err) return console.log(err);

    console.log('Server OK');
});
