import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    const superAdminRole = await prisma.role.upsert({
        where: { name: "SUPERADMIN" },
        update: {},
        create: { name: "SUPERADMIN" },
    });

    const userRole = await prisma.role.upsert({
        where: { name: "USER" },
        update: {},
        create: { name: "USER" },
    });

    const approvedRole = await prisma.role.upsert({
        where: { name: "APPROVED" },
        update: {},
        create: { name: "APPROVED" },
    });

    const password = await bcrypt.hash("password123", 10);

    const users = [
        {
            name: "Super Admin",
            email: "admin@nontonflix.com",
            roleId: superAdminRole.id,
        },
        {
            name: "Regular User",
            email: "user@nontonflix.com",
            roleId: userRole.id,
        },
        {
            name: "Approved User",
            email: "approved@nontonflix.com",
            roleId: approvedRole.id,
        },
    ];

    for (const u of users) {
        const user = await prisma.user.upsert({
            where: { email: u.email },
            update: {},
            create: {
                name: u.name,
                email: u.email,
                password,
                roleId: u.roleId,
            },
        });

        await prisma.profile.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                bio: "",
                avatarUrl: "",
            },
        });

        await prisma.accountSetting.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                theme: "light",
                language: "id",
                privacy: "public",
            },
        });
    }

    console.log("Seed roles, users, profiles & account settings completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
