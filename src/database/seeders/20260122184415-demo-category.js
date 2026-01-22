"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Category",
      [
        { name: "Movie", createdAt: new Date(), updatedAt: new Date() },
        { name: "Series", createdAt: new Date(), updatedAt: new Date() },
        { name: "Documentary", createdAt: new Date(), updatedAt: new Date() },
        { name: "Animation", createdAt: new Date(), updatedAt: new Date() },
        { name: "Short Film", createdAt: new Date(), updatedAt: new Date() },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Category",
      {
        name: ["Movie", "Series", "Documentary", "Animation", "Short Film"],
      },
      {},
    );
  },
};
