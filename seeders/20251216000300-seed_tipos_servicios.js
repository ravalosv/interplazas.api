"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const desired = ["Inumación", "Cremación", "Otro"];
    const toInsert = [];
    for (const nombre of desired) {
      const exists = await queryInterface.rawSelect("tipos_servicios", { where: { nombre } }, ["id"]);
      if (!exists) toInsert.push({ nombre, createdAt: now, updatedAt: now });
    }
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("tipos_servicios", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "tipos_servicios",
      { nombre: ["Inumación", "Cremación", "Otro"] },
      {}
    );
  },
};
