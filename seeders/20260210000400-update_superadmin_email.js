"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the user with ID 1 (SuperAdmin) to have email = "super@admin.com"
    await queryInterface.bulkUpdate(
      "usuarios",
      { email: "super@admin.com" },
      { id: 1 }
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert the user with ID 1 to have email = "admin@admin.com"
    await queryInterface.bulkUpdate(
      "usuarios",
      { email: "admin@admin.com" },
      { id: 1 }
    );
  },
};
