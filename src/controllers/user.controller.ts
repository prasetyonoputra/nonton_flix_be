import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { parsePaginationQuery } from "../utils/pagination";

export const create = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const findAll = async (req: Request, res: Response) => {
  try {
    const pagination = parsePaginationQuery(req);
    const users = await userService.getUsers(pagination);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const findOne = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    res.json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(Number(req.params.id), req.body);
    res.json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.json({ message: "User deleted successfully" });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
