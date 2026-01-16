import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userService from "../services/user.service";
import { CreateUserDto } from "../dto/user.dto";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "1d";

export const register = async (data: CreateUserDto) => {
    data.roleId = 2;
    const savedUser = await userService.createUser(data);

    return { user: savedUser };
};

export const login = async (data: { email: string; password: string }) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
        include: { role: true },
    });

    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(data.password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role.name,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role.name,
        },
    };
};

export const getProfile = async (userId: number) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            role: { select: { name: true } },
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) throw new Error("User not found");

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
