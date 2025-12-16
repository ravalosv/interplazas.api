"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const nombres = [
      "MAZATLÁN",
      "DURANGO",
      "ENSENADA",
      "ROSARITO",
      "TECATE",
      "TIJUANA",
      "TORREÓN",
      "MEXICALI",
      "CELAYA",
      "IRAPUATO",
      "LEÓN",
      "MANZANILLO",
      "MONTERREY",
      "QUERÉTARO",
      "SALAMANCA",
      "SAN LUIS POTOSÍ",
      "HERMOSILLO",
      "CIUDAD GUZMAN",
      "AGUASCALIENTES",
      "CHIHUAHUA",
      "CIUDAD JUAREZ",
      "CIUDAD OBREGÓN",
      "COLIMA",
      "CULIACÁN",
      "MATAMOROS",
      "CDMX",
      "ORIZABA",
      "PUERTO VALLARTA",
      "LAS VARAS",
      "REYNOSA",
      "TECOMÁN",
      "XALAPA",
      "ACAPULCO",
      "CANCÚN",
      "CUERNAVACA",
      "GUADALAJARA",
      "MÉRIDA",
      "MONCLOVA",
      "NUEVO LAREDO",
      "PUEBLA",
      "SALTILLO",
      "TAMPICO",
      "TOLUCA",
      "TUXTLA",
      "VILLAHERMOSA",
      "MORELIA",
      "VERACRUZ",
      "TEPIC",
      "ESTADOS UNIDOS",
    ];

    const toInsert = [];
    for (const nombre of nombres) {
      const exists = await queryInterface.rawSelect("filiales", { where: { nombre } }, ["id"]);
      if (!exists) {
        const extranjera = nombre === "ESTADOS UNIDOS";
        toInsert.push({ nombre, extranjera, createdAt: now, updatedAt: now });
      }
    }
    if (toInsert.length === 0) return;
    await queryInterface.bulkInsert("filiales", toInsert);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "filiales",
      {
        nombre: [
          "MAZATLÁN",
          "DURANGO",
          "ENSENADA",
          "ROSARITO",
          "TECATE",
          "TIJUANA",
          "TORREÓN",
          "MEXICALI",
          "CELAYA",
          "IRAPUATO",
          "LEÓN",
          "MANZANILLO",
          "MONTERREY",
          "QUERÉTARO",
          "SALAMANCA",
          "SAN LUIS POTOSÍ",
          "HERMOSILLO",
          "CIUDAD GUZMAN",
          "AGUASCALIENTES",
          "CHIHUAHUA",
          "CIUDAD JUAREZ",
          "CIUDAD OBREGÓN",
          "COLIMA",
          "CULIACÁN",
          "MATAMOROS",
          "CDMX",
          "ORIZABA",
          "PUERTO VALLARTA",
          "LAS VARAS",
          "REYNOSA",
          "TECOMÁN",
          "XALAPA",
          "ACAPULCO",
          "CANCÚN",
          "CUERNAVACA",
          "GUADALAJARA",
          "MÉRIDA",
          "MONCLOVA",
          "NUEVO LAREDO",
          "PUEBLA",
          "SALTILLO",
          "TAMPICO",
          "TOLUCA",
          "TUXTLA",
          "VILLAHERMOSA",
          "MORELIA",
          "VERACRUZ",
          "TEPIC",
          "ESTADOS UNIDOS",
        ],
      },
      {}
    );
  },
};
