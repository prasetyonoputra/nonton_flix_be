"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tag",
      [
        { name: "Action", createdAt: new Date(), updatedAt: new Date() },
        { name: "Drama", createdAt: new Date(), updatedAt: new Date() },
        { name: "Comedy", createdAt: new Date(), updatedAt: new Date() },
        { name: "Horror", createdAt: new Date(), updatedAt: new Date() },
        { name: "Romance", createdAt: new Date(), updatedAt: new Date() },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Tag",
      { name: ["Action", "Drama", "Comedy", "Horror", "Romance"] },
      {},
    );
  },
};
