"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Update the user with ID 1 (Admin) to have tipoUsuarioId = 3 (SuperAdmin)
    await queryInterface.bulkUpdate(
      "usuarios",
      { tipoUsuarioId: 3 },
      { id: 1 }
    );
  },

  async down(queryInterface, Sequelize) {
    // Revert the user with ID 1 to have tipoUsuarioId = 1 (Admin)
    await queryInterface.bulkUpdate(
      "usuarios",
      { tipoUsuarioId: 1 },
      { id: 1 }
    );
  },
};
