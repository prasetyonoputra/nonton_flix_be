import bcrypt from "bcrypt";
import { FindOptions } from "sequelize";
import {
  formatPaginationResult,
  getPaginationOptions,
  PaginationParams,
  PaginationResult,
} from "../helpers/pagination.helper";
import { UserApp } from "../models/user.model";

export class UserService {
  private saltRounds = 10;

  async getAll(params: PaginationParams): Promise<PaginationResult<UserApp>> {
    const options: FindOptions = getPaginationOptions(params);

    options.attributes = { exclude: ["password"] };

    const { rows, count } = await UserApp.findAndCountAll(options);

    return formatPaginationResult(rows, count, params.page || 1, params.limit || 10);
  }

  async getById(id: number | string) {
    return await UserApp.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  }

  async create(data: any) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, this.saltRounds);
    }

    const user = await UserApp.create(data);

    const result = user.toJSON();
    delete result.password;
    return result;
  }

  async update(id: number | string, data: any) {
    const user = await UserApp.findByPk(id);
    if (!user) return null;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, this.saltRounds);
    }

    await user.update(data);

    return this.getById(id);
  }

  async delete(id: number | string): Promise<boolean> {
    const user = await UserApp.findByPk(id);
    if (!user) return false;

    await user.destroy();
    return true;
  }

  async findByEmail(email: string) {
    return await UserApp.findOne({ where: { email } });
  }
}
