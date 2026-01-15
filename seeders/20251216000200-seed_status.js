"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const desired = ["Pagado", "Activo", "Suspendido", "Cancelado"];
    const toInsert = [];
    for (const nombre of desired) {
      const exists = await queryInterface.rawSelect("status_contrato", { where: { nombre } }, ["id"]);
      if (!exists) toInsert.push({ nombre, createdAt: now, updatedAt: now });
    }
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("status_contrato", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "status_contrato",
      { nombre: ["Pagado", "Activo", "Suspendido", "Cancelado"] },
      {}
    );
  },
};
