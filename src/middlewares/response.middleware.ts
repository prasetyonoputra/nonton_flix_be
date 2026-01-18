import { Response } from "express";

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

export const responseError = (
    res: Response,
    message = "Internal Server Error",
    statusCode = 500,
    error?: any,
) => {
    const response: ApiResponse = {
        success: false,
        message,
        error,
    };

    return res.status(statusCode).json(response);
};
