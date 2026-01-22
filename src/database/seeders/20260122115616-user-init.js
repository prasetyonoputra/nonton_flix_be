"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const SALT_ROUNDS = 10;
    const password = await bcrypt.hash("password123", SALT_ROUNDS);

    await queryInterface.bulkInsert("UserApp", [
      {
        email: "superadmin@nontonflix.com",
        fullName: "Super Admin",
        password: password,
        role: "SUPERADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "approved@nontonflix.com",
        fullName: "User Approval",
        password: password,
        role: "APPROVED",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "user@nontonflix.com",
        fullName: "User Testing",
        password: password,
        role: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserApp", {
      email: [
        "superadmin@nontonflix.com",
        "approved@nontonflix.com",
        "user@nontonflix.com",
      ],
    });
  },
};
