import prisma from "../utils/prisma";

export const createPlaylist = async (
    userId: number,
    name: string,
    description?: string,
    isPublic = true
) => {
    return prisma.playlist.create({
        data: { userId, name, description, isPublic },
    });
};

export const addVideoToPlaylist = async (
    playlistId: number,
    videoId: number,
    order?: number
) => {
    return prisma.playlistVideo.create({
        data: { playlistId, videoId, order: order || 0 },
    });
};

export const removeVideoFromPlaylist = async (
    playlistId: number,
    videoId: number
) => {
    return prisma.playlistVideo.delete({
        where: { playlistId_videoId: { playlistId, videoId } },
    });
};

export const getPlaylists = async (userId: number) => {
    return prisma.playlist.findMany({
        where: { userId },
        include: { videos: { include: { video: true } } },
    });
};

export const deletePlaylist = async (id: number, userId: number) => {
    const playlist = await prisma.playlist.findUnique({ where: { id } });
    if (!playlist) throw new Error("Playlist not found");
    if (playlist.userId !== userId) throw new Error("Unauthorized");

    await prisma.playlistVideo.deleteMany({ where: { playlistId: id } });
    return prisma.playlist.delete({ where: { id } });
};
