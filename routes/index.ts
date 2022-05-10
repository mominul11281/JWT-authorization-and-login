import express from 'express';
import AuthController from '../controllers';
import Validation from '../middlewares/validation';
const router = express.Router();

router.post('/signup', Validation.signupValidator, AuthController.signup);

router.post('/signin', Validation.signinValidator, AuthController.signin);

router.get('/logout', AuthController.logout);

router.post(
    '/token',
    Validation.tokenValidator,
    AuthController.refreshAccessToken
);

export default router;
