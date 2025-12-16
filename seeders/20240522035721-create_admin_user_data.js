"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const email = "admin@admin.com";
    const existsById = await queryInterface.rawSelect("usuarios", { where: { id: 1 } }, ["id"]);
    const existsByEmail = await queryInterface.rawSelect("usuarios", { where: { email } }, ["id"]);
    if (existsById || existsByEmail) return;
    const now = new Date();
    await queryInterface.bulkInsert("usuarios", [
      {
        id: 1,
        name: "Admin",
        email,
        password: "$2a$10$P5kG2qfUtY5ChCUExADdJeNn7bXSnB2OLEcc1JtZU7W2drE8Y4V0O",
        tipoUsuarioId: 1,
        filialId: null,
        isDisabled: false,
        createdByUserId: null,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("usuarios", null, {});
  },
};
