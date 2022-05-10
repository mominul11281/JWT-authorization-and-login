import { body } from 'express-validator';
import User from '../database/models/user';

const Validation = {
    signupValidator: [
        body('name').isString(),
        body('email')
            .normalizeEmail()
            .isEmail()
            .withMessage('Email is not valid')
            .custom(async (value) => {
                const user = await User.findOne({
                    where: { email: value },
                });
                if (user) {
                    throw new Error('Email is already in use');
                }
            }),
        body('password').isString(),
    ],
    signinValidator: [
        body('email')
            .normalizeEmail()
            .isEmail()
            .withMessage('Email is not valid'),
        body('password').isString(),
    ],
    tokenValidator: [
        body('refresh_token').isString().notEmpty(),
        body('userid').isNumeric().notEmpty(),
        body('email')
            .normalizeEmail()
            .isEmail()
            .withMessage('Email is not valid'),
        body('name').isString().notEmpty(),
    ],
};

export default Validation;
