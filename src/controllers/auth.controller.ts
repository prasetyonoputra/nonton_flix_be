import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        return responseSuccess(res, user);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body);
        return responseSuccess(res, result);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const profile = await authService.getProfile(Number(req.user?.id));
        return responseSuccess(res, profile);
    } catch (err: any) {
        return responseError(res, err);
    }
};
