import { Request, Response } from "express";
import { ValidationError } from "sequelize";

export function errorMiddleware(err: any, req: Request, res: Response) {
  if (err instanceof ValidationError) {
    const errors: Record<string, string> = {};

    err.errors.forEach((e) => {
      if (e.path) {
        errors[e.path] = e.message;
      }
    });

    return res.status(422).json({
      success: false,
      message: "Validation error",
      errors,
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
