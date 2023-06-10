import { validateRequest, requireAuth } from '@tuanha888.fadebook/common';
import express, {Request,Response} from 'express'
import { body } from 'express-validator';
import {authController} from "../controllers"
const authRouter = express.Router();

authRouter.post(
    '/login',
    [   
    body('email').isEmail().withMessage("Email must be valid"),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("You must supply a password")
    ],
    validateRequest,
    authController.login
    );

authRouter.post(
    '/signup',
    [
        body('firstName')
            .trim()
            .notEmpty()
            .withMessage("FirstName can not be empty"),
        body('lastName')
            .trim()
            .notEmpty()
            .withMessage("LastName can not be empty"),
        body('email')
            .isEmail()
            .withMessage("Email must be valid"),
        body('password')
            .trim()
            .notEmpty()
            .withMessage("Password can not be empty"),
        body('dateOfBirth')
            .trim()
            .notEmpty()
            .withMessage("Date of birth can not be empty"),
        body('gender')
            .trim()
            .notEmpty()
            .withMessage("gender can not be empty"),

    ],
    validateRequest,
    authController.signup
    );
authRouter.post('/refresh-token', authController.refreshToken );
authRouter.post('/logout', requireAuth, authController.logout );

export  {authRouter};