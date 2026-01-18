import { Request, Response } from "express";
import * as profileService from "../services/profile.service";
import { UpdateProfileDto } from "../dto/profile.dto";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const update = async (req: Request, res: Response) => {
    try {
        const payload = req.body as UpdateProfileDto;

        const user = await profileService.updateProfile(
            Number(req.params.id),
            payload,
        );

        return responseSuccess(res, user);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const user = await profileService.getUserProfile(Number(req.params.id));

        return responseSuccess(res, user);
    } catch (err: any) {
        return responseError(res, err);
    }
};
