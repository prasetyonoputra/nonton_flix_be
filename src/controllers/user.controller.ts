import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { parsePaginationQuery } from "../utils/pagination";
import {
    responseError,
    responseSuccess,
} from "../middlewares/response.middleware";

export const create = async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);

        return responseSuccess(res, user);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const findAll = async (req: Request, res: Response) => {
    try {
        const pagination = parsePaginationQuery(req);
        const users = await userService.getUsers(pagination);

        return responseSuccess(res, users);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const findOne = async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));

        return responseSuccess(res, user);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const user = await userService.updateUser(
            Number(req.params.id),
            req.body,
        );

        return responseSuccess(res, user);
    } catch (err: any) {
        return responseError(res, err);
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await userService.deleteUser(Number(req.params.id));

        return responseSuccess(res, null);
    } catch (err: any) {
        return responseError(res, err);
    }
};
