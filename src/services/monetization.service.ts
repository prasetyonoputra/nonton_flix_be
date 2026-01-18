import prisma from "../utils/prisma";

export const createAdVideo = async (
    videoId: number,
    title: string,
    revenue: number = 0,
) => {
    return prisma.adVideo.create({
        data: { videoId, title, revenue },
    });
};

export const updateAdRevenue = async (adId: number, revenue: number) => {
    return prisma.adVideo.update({
        where: { id: adId },
        data: { revenue },
    });
};

export const getAdsByVideo = async (videoId: number) => {
    return prisma.adVideo.findMany({ where: { videoId } });
};

export const subscribePremium = async (
    userId: number,
    endDate: Date,
    price: number,
) => {
    return prisma.premiumSubscription.create({
        data: { userId, endDate, price, active: true },
    });
};

export const cancelPremium = async (subscriptionId: number) => {
    return prisma.premiumSubscription.update({
        where: { id: subscriptionId },
        data: { active: false },
    });
};

export const donate = async (
    fromUserId: number,
    toUserId: number,
    amount: number,
    videoId?: number,
    message?: string,
) => {
    return prisma.donation.create({
        data: { fromUserId, toUserId, amount, videoId, message },
    });
};

export const sellContent = async (
    contentId: number,
    buyerId: number,
    price: number,
) => {
    return prisma.contentSale.create({
        data: { contentId, buyerId, price },
    });
};

export const getRevenueStats = async (userId: number) => {
    const adRevenue = await prisma.adVideo.aggregate({
        _sum: { revenue: true },
        where: { video: { userId } },
    });

    const donationRevenue = await prisma.donation.aggregate({
        _sum: { amount: true },
        where: { toUserId: userId },
    });

    const premiumRevenue = await prisma.premiumSubscription.aggregate({
        _sum: { price: true },
        where: { userId },
    });

    const contentRevenue = await prisma.contentSale.aggregate({
        _sum: { price: true },
        where: { video: { userId } },
    });

    return {
        adRevenue: adRevenue._sum.revenue || 0,
        donationRevenue: donationRevenue._sum.amount || 0,
        premiumRevenue: premiumRevenue._sum.price || 0,
        contentRevenue: contentRevenue._sum.price || 0,
        total:
            (adRevenue._sum.revenue || 0) +
            (donationRevenue._sum.amount || 0) +
            (premiumRevenue._sum.price || 0) +
            (contentRevenue._sum.price || 0),
    };
};
