import { Request, Response } from "express";
import * as profileService from "../services/profile.service";
import { UpdateProfileDto } from "../dto/profile.dto";

export const update = async (req: Request, res: Response) => {
    try {
        const payload = req.body as UpdateProfileDto;

        const user = await profileService.updateProfile(
            Number(req.params.id),
            payload
        );
        res.json(user);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const user = await profileService.getUserProfile(Number(req.params.id));
        res.json(user);
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
};
