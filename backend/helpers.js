import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const createToken = (id) => {
    const token = jwt.sign(
        {
            _id: id,
        },
        'secret123',
        {
            expiresIn: '35d',
        }
    );
    return token;
};

export const validationErrors = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json(errors.array().map((item) => item.msg));
    return null;
};
