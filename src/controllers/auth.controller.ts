import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { success } from "../helpers/response.helper";

export class AuthController {
  private service = new AuthService();

  register = async (req: Request, res: Response) => {
    const user = await this.service.register(req.body.email, req.body.password);
    return success(res, user, "Registered");
  };

  login = async (req: Request, res: Response) => {
    const token = await this.service.login(req.body.email, req.body.password);
    return success(res, { token }, "Login success");
  };
}
