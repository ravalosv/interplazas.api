"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const desired = ["Metalico", "Madera", "Urna", "Otro", "Ninguno"];
    const toInsert = [];
    for (const nombre of desired) {
      const exists = await queryInterface.rawSelect("tipos_ataudes", { where: { nombre } }, ["id"]);
      if (!exists) toInsert.push({ nombre, createdAt: now, updatedAt: now });
    }
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("tipos_ataudes", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "tipos_ataudes",
      { nombre: ["Metalico", "Madera", "Urna", "Otro", "Ninguno"] },
      {}
    );
  },
};
