"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const id = 4;
    const exists = await queryInterface.rawSelect(
      "tipos_usuarios",
      { where: { id } },
      ["id"]
    );
    if (!exists) {
      await queryInterface.bulkInsert("tipos_usuarios", [
        { id, nombre: "Captura", createdAt: now, updatedAt: now },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tipos_usuarios", { id: 4 }, {});
  },
};
