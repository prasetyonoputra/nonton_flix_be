import { Response } from "express";

export const success = <T>(
  res: Response,
  data: T,
  message?: string,
  status: number = 200,
) => {
  return res.status(status).json({
    status: "success",
    message: message || null,
    data,
  });
};

export const error = (res: Response, message: string, status: number = 400) => {
  return res.status(status).json({
    status: "error",
    message,
    data: null,
  });
};

export const notFound = (res: Response, message: string = "Not Found") => {
  return res.status(404).json({
    status: "error",
    message,
    data: null,
  });
};
