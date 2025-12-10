"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("usuarios", [
      {
        id: 1,
        name: "Admin",
        email: "admin@admin.com",
        password: "$2a$10$P5kG2qfUtY5ChCUExADdJeNn7bXSnB2OLEcc1JtZU7W2drE8Y4V0O",
        role: "admin",
        tipoUsuarioId: 1,
        filialId: null,
        isDisabled: false,
        createdByUserId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
