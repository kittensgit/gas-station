import express from 'express';
import mongoose from 'mongoose';

import {
    loginValidation,
    refuelValidation,
    registerValidation,
    quantityValidation,
    addProductValidation,
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
app.post(
    '/machines/add',
    checkAuth,
    checkAdmin,
    quantityValidation,
    handleValidationErrors,
    MachineController.addMachine
);
app.delete(
    '/machines/:machineId',
    checkAuth,
    checkAdmin,
    MachineController.deleteMachine
);

app.get('/showers', ShowerController.getShowers);
app.get('/showers/:showerId/book', checkAuth, ShowerController.bookShower);
app.get(
    '/showers/:showerId/release',
    checkAuth,
    ShowerController.releaseShower
);
app.post(
    '/showers/add',
    checkAuth,
    checkAdmin,
    quantityValidation,
    handleValidationErrors,
    ShowerController.addShower
);
app.delete(
    '/showers/:showerId',
    checkAuth,
    checkAdmin,
    ShowerController.deleteShower
);

app.get('/products', ProductController.getProducts);
app.get('/products/:productId', ProductController.getProduct);
app.post(
    '/products/:productId/order',
    checkAuth,
    quantityValidation,
    handleValidationErrors,
    OrderedProductController.orderProduct
);
app.post(
    '/products/add',
    checkAuth,
    checkAdmin,
    addProductValidation,
    handleValidationErrors,
    ProductController.addProduct
);
app.delete(
    '/products/:productId',
    checkAuth,
    checkAdmin,
    ProductController.deleteProduct
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
