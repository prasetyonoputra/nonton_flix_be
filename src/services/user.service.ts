import { PaginationParamsDto } from "../dto/pagination_params.dto";
import { UpdateUserDto } from "../dto/user.dto";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: "SUPERADMIN" | "USER" | "APPROVED";
}) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const role = await prisma.role.findUnique({
    where: { name: data.role || "USER" },
  });

  if (!role) throw new Error("Role not found");

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

  return { user: savedUser };
};

export const getUsers = async (paginationParams: PaginationParamsDto) => {
  const skip = (paginationParams.page - 1) * paginationParams.limit;

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: paginationParams.limit,
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
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const updateUser = async (id: number, data: UpdateUserDto) => {
  await getUserById(id);

  return prisma.user.update({
    where: { id },
    data: {
      title: data.title || "",
      url: data.url || "",
    },
  });
};

export const deleteUser = async (id: number) => {
  await getUserById(id);

  return prisma.user.delete({
    where: { id },
  });
};
