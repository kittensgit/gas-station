import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'The password must be at least 5 characters').isLength({
        min: 5,
    }),
];

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'The password must be at least 5 characters').isLength({
        min: 5,
    }),
    body('fullName', 'The name must be more than 3 characters').isLength({
        min: 3,
    }),
];

export const refuelValidation = [
    body('stationName', 'The name must be more than 3 characters').isLength({
        min: 3,
    }),
    body(
        'litersFilled',
        'The number of liters must be a number and greater than 0'
    )
        .isNumeric()
        .isFloat({ gt: 0 }),
    body('costPerLiter', 'Cost per liter must be a number and greater than 0')
        .isNumeric()
        .isFloat({ gt: 0 }),
];
