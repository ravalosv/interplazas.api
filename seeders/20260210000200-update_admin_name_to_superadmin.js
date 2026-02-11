"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the user with ID 1 to have name = "SuperAdmin"
    await queryInterface.bulkUpdate(
      "usuarios",
      { name: "SuperAdmin" },
      { id: 1 }
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert the user with ID 1 to have name = "Admin"
    await queryInterface.bulkUpdate(
      "usuarios",
      { name: "Admin" },
      { id: 1 }
    );
  },
};
