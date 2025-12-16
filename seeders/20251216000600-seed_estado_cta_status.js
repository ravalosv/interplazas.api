"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const desired = ["Solicitado", "Pendiente", "Completado", "No aplica"];
    const toInsert = [];
    for (const nombre of desired) {
      const exists = await queryInterface.rawSelect("estado_cta_status", { where: { nombre } }, ["id"]);
      if (!exists) toInsert.push({ nombre, createdAt: now, updatedAt: now });
    }
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("estado_cta_status", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "estado_cta_status",
      { nombre: ["Solicitado", "Pendiente", "Completado", "No aplica"] },
      {}
    );
  },
};
