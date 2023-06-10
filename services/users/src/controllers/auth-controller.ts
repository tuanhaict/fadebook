import { NextFunction, Request, Response } from "express";
import { LoginDto, SignupDto } from "../application/dtos/dtos";
import * as authService from "../application/services/auth-service";
import { BadRequestError } from "@tuanha888.fadebook/common";

const login = async (req: Request, res: Response, next: NextFunction) => {
    const loginDto = req.body as LoginDto;
    const userLoginResponse = await authService.login(loginDto);
    return res.status(201).send(userLoginResponse);
};
const signup = async (req: Request, res: Response, next: NextFunction) => {
    const signupDto = req.body as SignupDto;
    const userSignUpResponse = await authService.signup(signupDto);
    return res.status(201).send(userSignUpResponse);
}
const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body.refreshToken) throw new BadRequestError("You must supply a refreshToken");
    const tokens = authService.refreshToken(req.body.refreshToken);
    return res.status(201).send(tokens);
}
const logout = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(201).send({msg: "Logout successfully!"});
}
export const authController = {
    login,
    signup,
    refreshToken,
    logout
}