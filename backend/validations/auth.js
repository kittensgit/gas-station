import { body } from 'express-validator';

export const registerValidation = [
    body('email', 'Invalid email format').isEmail(),
    body('password', 'The password must be at least 5 characters').isLength({
        min: 5,
    }),
    body('fullName', 'The name must be more than 3 characters').isLength({
        min: 3,
    }),
];
