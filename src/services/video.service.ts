import { PaginationParamsDto } from "../dto/pagination.dto";
import prisma from "../utils/prisma";

export const createVideo = async (
    userId: number,
    data: {
        title: string;
        description?: string;
        url: string;
        thumbnail?: string;
        categoryIds?: number[];
        tagIds?: number[];
    }
) => {
    return prisma.video.create({
        data: {
            title: data.title,
            description: data.description,
            url: data.url,
            thumbnail: data.thumbnail,
            userId,
            categories: {
                create:
                    data.categoryIds?.map((catId) => ({ categoryId: catId })) ||
                    [],
            },
            tags: {
                create: data.tagIds?.map((tagId) => ({ tagId })) || [],
            },
        },
        include: { categories: true, tags: true },
    });
};

export const getVideos = async (paginationParams: PaginationParamsDto) => {
    const skip = (paginationParams.page - 1) * paginationParams.limit;
    const sortField = paginationParams.sort || "createdAt";
    const sortDir: "asc" | "desc" =
        paginationParams.dir === "asc" ? "asc" : "desc";

    const orderBy = { [sortField]: sortDir };

    const [data, total] = await Promise.all([
        prisma.video.findMany({
            skip,
            take: paginationParams.limit,
            orderBy: orderBy,
            include: {
                user: { select: { id: true, name: true, email: true } },
                categories: {
                    select: { category: { select: { name: true } } },
                },
                tags: { select: { tag: { select: { name: true } } } },
            },
        }),
        prisma.video.count(),
    ]);

    const formatted = data.map((v: any) => ({
        id: v.id,
        title: v.title,
        description: v.description,
        url: v.url,
        thumbnail: v.thumbnail,
        createdAt: v.createdAt,
        user: v.user,
        categories: v.categories.map((c: any) => c.category.name),
        tags: v.tags.map((t: any) => t.tag.name),
    }));

    return {
        data: formatted,
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
        include: {
            user: { select: { id: true, name: true, email: true } },
            categories: { select: { category: { select: { name: true } } } },
            tags: { select: { tag: { select: { name: true } } } },
        },
    });

    if (!video) throw new Error("Video not found");

    const thumbnailUrl = video.thumbnail
        ? `${process.env.BASE_URL}/${video.thumbnail.replace(/\\/g, "/")}`
        : null;

    return {
        id: video.id,
        title: video.title,
        description: video.description,
        url: video.url,
        thumbnail: thumbnailUrl,
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
        user: video.user,
        categories: video.categories.map((c) => c.category.name),
        tags: video.tags.map((t) => t.tag.name),
    };
};

export const updateVideo = async (
    userId: number,
    videoId: number,
    data: {
        title?: string;
        description?: string;
        categoryIds?: number[];
        tagIds?: number[];
        thumbnail?: string;
    }
) => {
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    if (!video) throw new Error("Video not found");
    if (video.userId !== userId) throw new Error("Unauthorized");

    return prisma.video.update({
        where: { id: videoId },
        data: {
            title: data.title,
            description: data.description,
            thumbnail: data.thumbnail,
            updatedAt: new Date(),
            categories: data.categoryIds
                ? {
                      deleteMany: {},
                      create: data.categoryIds.map((id) => ({
                          categoryId: id,
                      })),
                  }
                : undefined,
            tags: data.tagIds
                ? {
                      deleteMany: {},
                      create: data.tagIds.map((id) => ({ tagId: id })),
                  }
                : undefined,
        },
        include: { categories: true, tags: true },
    });
};

export const deleteVideo = async (id: number) => {
    const video = await getVideoById(id);
    if (!video) throw new Error("Video not found");

    await prisma.videoCategory.deleteMany({
        where: { videoId: id },
    });

    await prisma.videoTag.deleteMany({
        where: { videoId: id },
    });

    if (video.thumbnail) {
        const fs = await import("fs");
        fs.unlink(video.thumbnail, (err) => {
            if (err) console.warn("Failed to delete thumbnail:", err.message);
        });
    }

    const deleted = await prisma.video.delete({
        where: { id },
    });

    return {
        message: "Video deleted successfully",
        video: deleted,
    };
};
