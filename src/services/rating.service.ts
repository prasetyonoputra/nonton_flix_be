import prisma from "../utils/prisma";

export const addOrUpdateRating = async (
    userId: number,
    videoId: number,
    value: number
) => {
    if (value === undefined || value === null) {
        throw new Error("Rating value is required");
    }

    return prisma.rating.upsert({
        where: { userId_videoId: { userId, videoId } },
        update: { value },
        create: { userId, videoId, value },
    });
};

export const getVideoRating = async (videoId: number) => {
    const ratings = await prisma.rating.findMany({ where: { videoId } });
    const avg =
        ratings.reduce((sum, r) => sum + r.value, 0) / (ratings.length || 1);
    return { average: avg, total: ratings.length, ratings };
};
