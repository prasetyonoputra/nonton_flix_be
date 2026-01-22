import { Request, Response } from "express";
import { error, notFound, success } from "../helpers/response.helper";
import { UserService } from "../services/user.service";
import { PaginationParams } from "../helpers/pagination.helper";

export class UserController {
  private service = new UserService();

  getAll = async (req: Request, res: Response) => {
    try {
      const params: PaginationParams = {
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
        sortBy: req.query.sortBy as string,
        sortOrder: req.query.sortOrder as string,
      };

      const result = await this.service.getAll(params);
      return success(res, result, "Fetched all users");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.service.getById(id);

      if (!result) return notFound(res);
      return success(res, result, "Fetched user details");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { email, password, fullName, role } = req.body;

      if (!email || !password) {
        return error(res, "Email and password are required", 400);
      }

      const existingUser = await this.service.findByEmail(email);
      if (existingUser) {
        return error(res, "Email already in use", 400);
      }

      const result = await this.service.create(req.body);
      return success(res, result, "User created successfully", 201);
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const result = await this.service.update(id, req.body);
      if (!result) return notFound(res);

      return success(res, result, "User updated successfully");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const isDeleted = await this.service.delete(id);

      if (!isDeleted) return notFound(res);
      return success(res, null, "User deleted successfully");
    } catch (err: any) {
      return error(res, err.message || "Internal Server Error", 500);
    }
  };
}
