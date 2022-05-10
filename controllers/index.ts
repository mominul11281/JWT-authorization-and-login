import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import BlacklistJWT from '../database/models/blacklistjwt';
import User from '../database/models/user';
import { failure, success } from '../utils/commonResponse';
import httpStatus from '../utils/statusCode';

class AuthController {
    async signup(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(httpStatus.UNPROCESSABLE_ENTITY)
                    .send(failure('Validation Error', errors.array()));
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user: any = await User.create(req.body);
            const userInfo = {
                userid: user.id,
                email: user.email,
                name: user.name,
            };
            const access_token = jwt.sign(
                userInfo,
                process.env.JWT_SECRET_KEY,
                { expiresIn: '5m' }
            );
            const refresh_token = jwt.sign(
                userInfo,
                process.env.REFRESH_SECRECT_KEY,
                { expiresIn: '1h' }
            );
            const data = {
                access_token,
                refresh_token,
                id: user.id,
                email: user.email,
                name: user.name,
            };
            return res
                .status(httpStatus.OK)
                .send(success('Account is created', data));
        } catch (e: any) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send(failure('Account create is failed', e.message));
        }
    }

    async signin(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(httpStatus.UNPROCESSABLE_ENTITY)
                    .send(failure('Validation Error', errors.array()));
            }
            const user: any = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (!user) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send(failure('Authentication failed.'));
            }
            const checkPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!checkPassword) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send(failure('Authentication failed.'));
            }
            const userInfo = {
                userid: user.id,
                email: user.email,
                name: user.name,
            };
            const access_token = jwt.sign(
                userInfo,
                process.env.JWT_SECRET_KEY,
                { expiresIn: '5m' }
            );
            const refresh_token = jwt.sign(
                userInfo,
                process.env.REFRESH_SECRECT_KEY,
                { expiresIn: '1h' }
            );
            const data = {
                access_token,
                refresh_token,
                id: user.id,
                name: user.name,
                email: user.email,
            };
            return res
                .status(httpStatus.OK)
                .send(success('Login is successfull', data));
        } catch (e: any) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send(failure('Login failed.', e.message));
        }
    }

    async logout(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY);
            const isBlackList: any = await BlacklistJWT.findOne({
                where: { token },
            });
            if (isBlackList) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send(failure('You are unauthorized!'));
            }
            const blacklistJWT: any = await BlacklistJWT.create({ token });
            if (!blacklistJWT) {
                return res
                    .status(httpStatus.INTERNAL_SERVER_ERROR)
                    .send(failure('Logout failed.'));
            }
            return res
                .status(httpStatus.OK)
                .send(success('Logout successfull', {}));
        } catch (e: any) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send(failure('Logout failed.', e.message));
        }
    }

    async refreshAccessToken(req, res) {
        jwt.verify(req.body.refresh_token, process.env.REFRESH_SECRECT_KEY);
        try {
            const user = {
                email: req.body.email,
                id: req.body.userid,
                name: req.body.name,
            };
            const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
                expiresIn: '300',
            });
            const response = {
                access_token: token,
            };
            return res
                .status(httpStatus.OK)
                .send(success('Login is successfull', response));
        } catch (e: any) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .send(failure('Token Refresh Failed', e.message));
        }
    }
}

export default new AuthController();
