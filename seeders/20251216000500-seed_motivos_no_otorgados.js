"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const desired = ["Otra Funeraria", "Servicio directo", "Traslado", "Utilizaron otro plan pagado", "Otro", "No aplica"];
    const toInsert = [];
    for (const nombre of desired) {
      const exists = await queryInterface.rawSelect("motivos_no_otorgados", { where: { nombre } }, ["id"]);
      if (!exists) toInsert.push({ nombre, createdAt: now, updatedAt: now });
    }
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("motivos_no_otorgados", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "motivos_no_otorgados",
      { nombre: ["Otra Funeraria", "Servicio directo", "Traslado", "Utilizaron otro plan pagado", "Otro", "No aplica"] },
      {}
    );
  },
};
