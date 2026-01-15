"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const desired = [
      { nombre: "Metalico", montoMXN: 6500 },
      { nombre: "Madera", montoMXN: 4500 },
      { nombre: "Urna", montoMXN: 4500 },
      { nombre: "Otro", montoMXN: 2000 },
      { nombre: "Ninguno", montoMXN: 0 }
    ];
    const toInsert = [];
    for (const item of desired) {
      const exists = await queryInterface.rawSelect("conceptos", { where: { nombre: item.nombre } }, ["id"]);
      if (!exists) {
        toInsert.push({
          nombre: item.nombre,
          montoMXN: item.montoMXN,
          montoUSD: 1200,
          createdAt: now,
          updatedAt: now
        });
      }
    }
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("conceptos", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "conceptos",
      { nombre: ["Metalico", "Madera", "Urna", "Otro", "Ninguno"] },
      {}
    );
  },
};
