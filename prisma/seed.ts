import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // === ROLES ===
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

  // === PASSWORD ===
  const password = await bcrypt.hash("password123", 10);

  // === USERS ===
  await prisma.user.upsert({
    where: { email: "admin@nontonflix.com" },
    update: {},
    create: {
      name: "Super Admin",
      email: "admin@nontonflix.com",
      password,
      roleId: superAdminRole.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@nontonflix.com" },
    update: {},
    create: {
      name: "Regular User",
      email: "user@nontonflix.com",
      password,
      roleId: userRole.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "approved@nontonflix.com" },
    update: {},
    create: {
      name: "Approved User",
      email: "approved@nontonflix.com",
      password,
      roleId: approvedRole.id,
    },
  });

  console.log("Seed roles & users completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
