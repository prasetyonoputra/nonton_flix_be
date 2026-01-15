import prisma from "../utils/prisma";

export const createVideo = async (data: { title: string; url: string }) => {
  return prisma.video.create({
    data,
  });
};

export const getVideos = async () => {
  return prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });
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
