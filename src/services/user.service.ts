import bcrypt from "bcrypt";
import { PaginationParamsDto } from "../dto/pagination.dto";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import prisma from "../utils/prisma";

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

  const savedUser = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roleId: role.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: { select: { name: true } },
    },
  });

  return savedUser;
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

export const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: { select: { name: true } },
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

  if (data.roleId) {
    const role = await prisma.role.findUnique({ where: { id: data.roleId } });
    if (!role) throw new NotFoundError("Role not found");
  }

  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: { select: { name: true } },
    },
  });
};

export const deleteUser = async (id: number) => {
  await getUserById(id);

  return prisma.user.delete({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};
