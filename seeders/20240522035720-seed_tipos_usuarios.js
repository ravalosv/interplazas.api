"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const desired = [
      { id: 1, nombre: "Admin", createdAt: now, updatedAt: now },
      { id: 2, nombre: "Filial", createdAt: now, updatedAt: now },
    ];

    const exists1 = await queryInterface.rawSelect(
      "tipos_usuarios",
      { where: { id: 1 } },
      ["id"]
    );
    const exists2 = await queryInterface.rawSelect(
      "tipos_usuarios",
      { where: { id: 2 } },
      ["id"]
    );
    const toInsert = desired.filter((d) => (d.id === 1 && !exists1) || (d.id === 2 && !exists2));
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("tipos_usuarios", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tipos_usuarios", { id: [1, 2] }, {});
  },
};
