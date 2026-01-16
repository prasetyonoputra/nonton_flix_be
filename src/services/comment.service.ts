import prisma from "../utils/prisma";
import { PaginationParamsDto } from "../dto/pagination.dto";

export const createComment = async (
    userId: number,
    videoId: number,
    content: string,
    parentId?: number
) => {
    return prisma.comment.create({
        data: { userId, videoId, content, parentId },
        include: { user: { select: { id: true, name: true, email: true } } },
    });
};

export const listComments = async (
    videoId: number,
    pagination: PaginationParamsDto
) => {
    const skip = (pagination.page - 1) * pagination.limit;

    const [comments, total] = await Promise.all([
        prisma.comment.findMany({
            where: { videoId, parentId: null },
            include: {
                user: { select: { id: true, name: true } },
                replies: {
                    include: {
                        user: { select: { id: true, name: true } },
                    },
                    orderBy: { createdAt: "asc" },
                },
            },
            skip,
            take: pagination.limit,
            orderBy: { createdAt: "desc" },
        }),
        prisma.comment.count({ where: { videoId, parentId: null } }),
    ]);

    const formatted = comments.map((c) => ({
        id: c.id,
        content: c.content,
        createdAt: c.createdAt,
        user: c.user,
        replies: c.replies.map((r) => ({
            id: r.id,
            content: r.content,
            createdAt: r.createdAt,
            user: r.user,
        })),
    }));

    return {
        data: formatted,
        pagination: {
            total,
            page: pagination.page,
            pageSize: pagination.limit,
            totalPage: Math.ceil(total / pagination.limit),
        },
    };
};

export const deleteComment = async (id: number, userId: number) => {
    const comment = await prisma.comment.findUnique({
        where: { id },
        include: { replies: true },
    });

    if (!comment) throw new Error("Comment not found");
    if (comment.userId !== userId) throw new Error("Unauthorized");

    const deleted = await prisma.$transaction(async (tx) => {
        if (comment.replies.length > 0) {
            await tx.comment.deleteMany({ where: { parentId: id } });
        }

        return tx.comment.delete({ where: { id } });
    });

    return {
        message: "Comment deleted successfully",
        comment: deleted,
    };
};
