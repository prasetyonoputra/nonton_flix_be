import { Response } from "express";
import { normalizeError } from "../helpers/error.helper";

export interface ApiResponse<T = any> {
    success: boolean;
    message: string;
    result?: T;
    error?: any;
}

export const responseSuccess = <T>(
    res: Response,
    result: T,
    message = "Success",
    statusCode = 200,
) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        result,
    };

    return res.status(statusCode).json(response);
};

export const responseError = (res: Response, err: any) => {
    const normalized = normalizeError(err);

    const response: ApiResponse = {
        success: false,
        message: normalized.message,
        error: normalized.error,
    };

    return res.status(normalized.statusCode).json(response);
};
