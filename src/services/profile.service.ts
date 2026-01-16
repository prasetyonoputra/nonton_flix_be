import { Profile } from "@prisma/client";
import { UpdateProfileDto } from "../dto/profile.dto";
import prisma from "../utils/prisma";
import { getUserById } from "./user.service";
class NotFoundError extends Error {}

export const getUserProfile = async (id: number): Promise<Profile> => {
    const profile = await prisma.profile.findUnique({
        where: { userId: id },
    });

    if (!profile) throw new NotFoundError("Profile not found");
    return profile;
};

export const updateProfile = async (
    userId: number,
    data: UpdateProfileDto
): Promise<Profile> => {
    await getUserById(userId);

    const result = await prisma.profile.update({
        where: { userId },
        data: {
            ...data,
        },
    });

    return result;
};
