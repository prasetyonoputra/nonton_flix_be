import { PaginationParamsDto } from "../dto/pagination.dto";
import prisma from "../utils/prisma";

export const createVideo = async (data: { title: string; url: string }) => {
    return prisma.video.create({
        data,
    });
};

export const getVideos = async (paginationParams: PaginationParamsDto) => {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const order = paginationParams.sort
        ? { [paginationParams.sort]: paginationParams.dir }
        : undefined;

    const [data, total] = await Promise.all([
        prisma.video.findMany({
            skip,
            take: paginationParams.limit,
            orderBy: order,
        }),
        prisma.video.count(),
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

export const getVideoById = async (id: number) => {
    const video = await prisma.video.findUnique({
        where: { id },
    });

    if (!video) throw new Error("Video not found");
    return video;
};

export const updateVideo = async (
    id: number,
    data: { title?: string; url?: string }
) => {
    await getVideoById(id);

    return prisma.video.update({
        where: { id },
        data,
    });
};

export const deleteVideo = async (id: number) => {
    await getVideoById(id);

    return prisma.video.delete({
        where: { id },
    });
};
