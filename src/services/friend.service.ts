import { PaginationParamsDto } from "../dto/pagination.dto";
import prisma from "../utils/prisma";

export const sendFriendRequest = async (userId: number, friendId: number) => {
    if (userId === friendId) throw new Error("Cannot add yourself");

    const [user, friend] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId } }),
        prisma.user.findUnique({ where: { id: friendId } }),
    ]);

    if (!user) throw new Error("User not found");
    if (!friend) throw new Error("Friend user not found");

    const existing = await prisma.friend.findUnique({
        where: { userId_friendId: { userId, friendId } },
    });

    if (existing) {
        if (existing.status === "pending")
            throw new Error("Friend request already sent");
        if (existing.status === "accepted")
            throw new Error("You are already friends");
    }

    const reciprocal = await prisma.friend.findUnique({
        where: { userId_friendId: { userId: friendId, friendId: userId } },
    });

    if (reciprocal) {
        if (reciprocal.status === "pending") {
            await prisma.friend.update({
                where: { id: reciprocal.id },
                data: { status: "accepted" },
            });
            return { message: "Friend request accepted" };
        }
        if (reciprocal.status === "accepted") {
            throw new Error("You are already friends");
        }
    }

    return prisma.friend.create({
        data: { userId, friendId, status: "pending" },
    });
};

export const acceptFriendRequest = async (userId: number, friendId: number) => {
    const existing = await prisma.friend.findUnique({
        where: { userId_friendId: { userId, friendId } },
    });
    if (!existing) throw new Error("Friend request not found");

    return prisma.friend.update({
        where: { userId_friendId: { userId, friendId } },
        data: { status: "accepted" },
    });
};

export const rejectFriendRequest = async (userId: number, friendId: number) => {
    const existing = await prisma.friend.findUnique({
        where: { userId_friendId: { userId, friendId } },
    });
    if (!existing) throw new Error("Friend request not found");

    return prisma.friend.delete({
        where: { userId_friendId: { userId, friendId } },
    });
};

export const listFriends = async (
    userId: number,
    paginationParams: PaginationParamsDto
) => {
    const skip = (paginationParams.page - 1) * paginationParams.limit;

    const allowedSort = ["id", "name", "email", "status"];
    const allowedDir = ["asc", "desc"];

    let sort =
        paginationParams.sort && allowedSort.includes(paginationParams.sort)
            ? paginationParams.sort
            : "name";

    let dir =
        paginationParams.dir &&
        allowedDir.includes(paginationParams.dir.toLowerCase())
            ? paginationParams.dir.toLowerCase()
            : "asc";

    const friends = await prisma.$queryRawUnsafe<
        Array<{
            id: number;
            name: string;
            email: string;
            status: string;
            direction: string;
        }>
    >(
        `
            SELECT f."friendId" as id, u.name, u.email, f.status, 'sent' as direction
            FROM "Friend" f
            JOIN "User" u ON u.id = f."friendId"
            WHERE f."userId" = $1

            UNION ALL

            SELECT f."userId" as id, u.name, u.email, f.status, 'received' as direction
            FROM "Friend" f
            JOIN "User" u ON u.id = f."userId"
            WHERE f."friendId" = $1

            ORDER BY ${sort} ${dir}
            LIMIT $2 OFFSET $3
        `,
        userId,
        paginationParams.limit,
        skip
    );

    const totalResult = await prisma.friend.count({
        where: { OR: [{ userId }, { friendId: userId }] },
    });

    return {
        data: friends,
        pagination: {
            total: totalResult,
            page: paginationParams.page,
            pageSize: paginationParams.limit,
            totalPage: Math.ceil(totalResult / paginationParams.limit),
        },
    };
};
