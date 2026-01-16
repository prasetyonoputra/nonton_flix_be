import bcrypt from "bcrypt";
import { PaginationParamsDto } from "../dto/pagination.dto";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import prisma from "../utils/prisma";
import { User } from "@prisma/client";

class NotFoundError extends Error {}
class BadRequestError extends Error {}

export const createUser = async (data: CreateUserDto) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existingUser) throw new BadRequestError("Email already registered");

    const role = await prisma.role.findUnique({ where: { id: data.roleId } });
    if (!role) throw new NotFoundError("Role not found");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const savedUser = await prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                roleId: role.id,
            },
        });

        await tx.profile.create({
            data: {
                userId: user.id,
                bio: "",
                avatarUrl: "",
            },
        });

        await tx.accountSetting.create({
            data: {
                userId: user.id,
                theme: "light",
                language: "id",
                privacy: "public",
            },
        });

        return user;
    });

    const userWithRole = await prisma.user.findUnique({
        where: { id: savedUser.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: { select: { name: true } },
        },
    });

    return userWithRole;
};

export const getUsers = async (paginationParams: PaginationParamsDto) => {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const order = paginationParams.sort
        ? { [paginationParams.sort]: paginationParams.dir }
        : undefined;

    const [data, total] = await Promise.all([
        prisma.user.findMany({
            skip,
            take: paginationParams.limit,
            orderBy: order,
            include: {
                role: { select: { name: true } },
                profile: true,
                accountSetting: true,
            },
        }),
        prisma.user.count(),
    ]);

    return {
        data,
        pagination: {
            total,
            page: paginationParams.page,
            pageSize: paginationParams.limit,
            totalPage: Math.ceil(total / paginationParams.limit),
        },
    };
};

export const getUserById = async (id: number): Promise<User> => {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            role: { select: { name: true } },
            profile: true,
            accountSetting: true,
        },
    });

    if (!user) throw new NotFoundError("User not found");
    return user;
};

export const updateUser = async (id: number, data: UpdateUserDto) => {
    const existingUser = await getUserById(id);

    if (data.email && data.email !== existingUser.email) {
        const emailExists = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (emailExists) throw new BadRequestError("Email already registered");
    }

    if (data.roleId && data.roleId !== existingUser.roleId) {
        const role = await prisma.role.findUnique({
            where: { id: data.roleId },
        });
        if (!role) throw new NotFoundError("Role not found");
    }

    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            ...data,
        },
        include: {
            role: { select: { name: true } },
            profile: true,
            accountSetting: true,
        },
    });

    return updatedUser;
};

export const deleteUser = async (id: number) => {
    const user = await getUserById(id);

    const deletedUser = await prisma.$transaction(async (tx) => {
        await tx.profile.delete({ where: { userId: user.id } });
        await tx.accountSetting.delete({ where: { userId: user.id } });
        return tx.user.delete({ where: { id: user.id } });
    });

    return {
        id: deletedUser.id,
        name: deletedUser.name,
        email: deletedUser.email,
    };
};
