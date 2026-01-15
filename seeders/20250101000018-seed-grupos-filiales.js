'use strict';

const gruposData = [
  { id: 1, nombre: "DANIEL MB", cobroEntreFiliales: true },
  { id: 2, nombre: "DAVID MB", cobroEntreFiliales: true },
  { id: 3, nombre: "DAVID MC", cobroEntreFiliales: true },
  { id: 4, nombre: "EMB", cobroEntreFiliales: true },
  { id: 5, nombre: "JMA", cobroEntreFiliales: true },
  { id: 6, nombre: "JMB", cobroEntreFiliales: false },
  { id: 7, nombre: "MOSENT/JMMB", cobroEntreFiliales: true },
  { id: 8, nombre: "KARINA ML", cobroEntreFiliales: true },
  { id: 9, nombre: "LMA", cobroEntreFiliales: true },
  { id: 10, nombre: "TEPIC", cobroEntreFiliales: true },
  { id: 11, nombre: "EE.UU", cobroEntreFiliales: true },
];

const filialesData = [
  { id: 1, grupoId: 1, nombre: "MAZATLAN", extranjera: false },
  { id: 2, grupoId: 1, nombre: "DURANGO", extranjera: false },
  { id: 3, grupoId: 1, nombre: "TORREON", extranjera: false },
  { id: 4, grupoId: 2, nombre: "ENSENADA", extranjera: false },
  { id: 5, grupoId: 2, nombre: "ROSARITO", extranjera: false },
  { id: 6, grupoId: 2, nombre: "TECATE", extranjera: false },
  { id: 7, grupoId: 2, nombre: "TIJUANA", extranjera: false },
  { id: 8, grupoId: 3, nombre: "MEXICALI", extranjera: false },
  { id: 9, grupoId: 4, nombre: "CELAYA", extranjera: false },
  { id: 10, grupoId: 4, nombre: "IRAPUATO", extranjera: false },
  { id: 11, grupoId: 4, nombre: "LEON", extranjera: false },
  { id: 12, grupoId: 4, nombre: "MANZANILLO", extranjera: false },
  { id: 13, grupoId: 4, nombre: "MONTERREY", extranjera: false },
  { id: 14, grupoId: 4, nombre: "QUERETARO", extranjera: false },
  { id: 15, grupoId: 4, nombre: "SALAMANCA", extranjera: false },
  { id: 16, grupoId: 4, nombre: "SAN LUIS POTOSI", extranjera: false },
  { id: 17, grupoId: 5, nombre: "CIUDAD GUZMAN", extranjera: false },
  { id: 18, grupoId: 5, nombre: "HERMOSILLO", extranjera: false },
  { id: 19, grupoId: 6, nombre: "AGUASCALIENTES", extranjera: false },
  { id: 20, grupoId: 6, nombre: "CDMX", extranjera: false },
  { id: 21, grupoId: 6, nombre: "CHIHUAHUA", extranjera: false },
  { id: 22, grupoId: 6, nombre: "CIUDAD JUAREZ", extranjera: false },
  { id: 23, grupoId: 6, nombre: "CIUDAD OBREGÓN", extranjera: false },
  { id: 24, grupoId: 6, nombre: "COLIMA", extranjera: false },
  { id: 25, grupoId: 6, nombre: "CULIACAN", extranjera: false },
  { id: 26, grupoId: 6, nombre: "MATAMOROS", extranjera: false },
  { id: 27, grupoId: 6, nombre: "CDMX", extranjera: false },
  { id: 28, grupoId: 6, nombre: "ORIZABA", extranjera: false },
  { id: 29, grupoId: 6, nombre: "PUERTO VALLARTA", extranjera: false },
  { id: 30, grupoId: 6, nombre: "LAS VARAS", extranjera: false },
  { id: 31, grupoId: 6, nombre: "REYNOSA", extranjera: false },
  { id: 32, grupoId: 6, nombre: "TECOMAN", extranjera: false },
  { id: 33, grupoId: 6, nombre: "XALAPA", extranjera: false },
  { id: 34, grupoId: 7, nombre: "ACAPULCO", extranjera: false },
  { id: 35, grupoId: 7, nombre: "CANCUN", extranjera: false },
  { id: 36, grupoId: 7, nombre: "CUERNAVACA", extranjera: false },
  { id: 37, grupoId: 7, nombre: "GUADALAJARA", extranjera: false },
  { id: 38, grupoId: 7, nombre: "MERIDA", extranjera: false },
  { id: 39, grupoId: 7, nombre: "MONCLOVA", extranjera: false },
  { id: 40, grupoId: 7, nombre: "NUEVO LAREDO", extranjera: false },
  { id: 41, grupoId: 7, nombre: "PUEBLA", extranjera: false },
  { id: 42, grupoId: 7, nombre: "SALTILLO", extranjera: false },
  { id: 43, grupoId: 7, nombre: "TAMPICO", extranjera: false },
  { id: 44, grupoId: 7, nombre: "TOLUCA", extranjera: false },
  { id: 45, grupoId: 7, nombre: "TUXTLA", extranjera: false },
  { id: 46, grupoId: 7, nombre: "VILLAHERMOSA", extranjera: false },
  { id: 47, grupoId: 8, nombre: "MORELIA", extranjera: false },
  { id: 48, grupoId: 9, nombre: "VERACRUZ", extranjera: false },
  { id: 49, grupoId: 10, nombre: "TEPIC", extranjera: false },
  { id: 50, grupoId: 11, nombre: "ESTADOS UNIDOS ", extranjera: true },
];

const sucursalesData = [
  { id: 1, nombre: "MAZATLÁN - LA CRUZ ELOTA", filialId: 1 },
  { id: 2, nombre: "MAZATLÁN-ESCUINAPA", filialId: 1 },
  { id: 3, nombre: "MAZATLÁN", filialId: 1 },
  { id: 4, nombre: "DURANGO", filialId: 2 },
  { id: 5, nombre: "ENSENADA", filialId: 4 },
  { id: 6, nombre: "ROSARITO", filialId: 5 },
  { id: 7, nombre: "TECATE", filialId: 6 },
  { id: 8, nombre: "TIJUANA", filialId: 7 },
  { id: 9, nombre: "TORREÓN", filialId: 3 },
  { id: 10, nombre: "MEXICALI", filialId: 8 },
  { id: 11, nombre: "MEXICALI (SAN LUIS RÓO COLORADO)", filialId: 8 },
  { id: 12, nombre: "CELAYA", filialId: 9 },
  { id: 13, nombre: "IRAPUATO", filialId: 10 },
  { id: 14, nombre: "LEON", filialId: 11 },
  { id: 15, nombre: "MANZANILLO", filialId: 12 },
  { id: 16, nombre: "MONTERREY", filialId: 13 },
  { id: 17, nombre: "QUERETARO", filialId: 14 },
  { id: 18, nombre: "SALAMANCA", filialId: 15 },
  { id: 19, nombre: "SAN LUIS POTOSI", filialId: 16 },
  { id: 20, nombre: "CD. GUZMAN", filialId: 17 },
  { id: 21, nombre: "CD. GUZMAN (TAMAZULA)", filialId: 17 },
  { id: 22, nombre: "HERMOSILLO", filialId: 18 },
  { id: 23, nombre: "AGUASCALIENTES", filialId: 19 },
  { id: 24, nombre: "CDMX", filialId: 20 },
  { id: 25, nombre: "CHIHUAHUA", filialId: 21 },
  { id: 26, nombre: "CD. JUAREZ", filialId: 22 },
  { id: 27, nombre: "CD. OBREGÓN", filialId: 23 },
  { id: 28, nombre: "COLIMA", filialId: 24 },
  { id: 29, nombre: "CULIACÁN", filialId: 25 },
  { id: 30, nombre: "MATAMOROS", filialId: 26 },
  { id: 31, nombre: "MEXICO/CUAUTITLAN", filialId: 27 },
  { id: 32, nombre: "ORIZABA", filialId: 28 },
  { id: 33, nombre: "PUERTO VALLARTA", filialId: 29 },
  { id: 34, nombre: "PUERTO VALLARTA (BUCERIAS)", filialId: 29 },
  { id: 35, nombre: "PUERTO VALLARTA (LAS PALMAS)", filialId: 29 },
  { id: 36, nombre: "LAS VARAS", filialId: 30 },
  { id: 37, nombre: "LAS VARAS (PUERTO VALLARTA)", filialId: 30 },
  { id: 38, nombre: "REYNOSA", filialId: 31 },
  { id: 39, nombre: "REYNOSA (RIO BRAVO)", filialId: 31 },
  { id: 40, nombre: "TECOMAN", filialId: 32 },
  { id: 41, nombre: "XALAPA", filialId: 33 },
  { id: 42, nombre: "ACAPULCO", filialId: 34 },
  { id: 43, nombre: "CANCUN", filialId: 35 },
  { id: 44, nombre: "CUERNAVACA", filialId: 36 },
  { id: 45, nombre: "GUADALAJARA", filialId: 37 },
  { id: 46, nombre: "MÉRIDA", filialId: 38 },
  { id: 47, nombre: "MONCLOVA", filialId: 39 },
  { id: 48, nombre: "NUEVO LAREDO", filialId: 40 },
  { id: 49, nombre: "PUEBLA", filialId: 41 },
  { id: 50, nombre: "SALTILLO", filialId: 42 },
  { id: 51, nombre: "TAMPICO", filialId: 43 },
  { id: 52, nombre: "TOLUCA", filialId: 44 },
  { id: 53, nombre: "TOLUCA/IXTLAHUACA", filialId: 44 },
  { id: 54, nombre: "TUXTLA", filialId: 45 },
  { id: 55, nombre: "VILLAHERMOSA", filialId: 46 },
  { id: 56, nombre: "MORELIA", filialId: 47 },
  { id: 57, nombre: "BOCA DEL RIO", filialId: 48 },
  { id: 58, nombre: "VERACRUZ", filialId: 48 },
  { id: 59, nombre: "TEPIC", filialId: 49 },
  { id: 60, nombre: "TEPIC (COMPOSTELA)", filialId: 49 },
  { id: 61, nombre: "TEPIC (VILLA HIDALGO)", filialId: 49 },
  { id: 62, nombre: "ESTADOS UNIDOS ", filialId: 50 },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    for (const row of gruposData) {
      const nombre = row.nombre;
      if (!nombre) continue;
      const cobroEntreFiliales = row.cobroEntreFiliales;

      const existingId = await queryInterface.rawSelect(
        "grupos",
        { where: { nombre } },
        ["id"]
      );

      if (!existingId) {
        await queryInterface.bulkInsert("grupos", [
          {
            nombre,
            cobroEntreFiliales,
            createdAt: now,
            updatedAt: now,
          },
        ]);
      } else {
        await queryInterface.bulkUpdate(
          "grupos",
          { cobroEntreFiliales, updatedAt: now },
          { id: existingId }
        );
      }
    }

    const groups = await queryInterface.sequelize.query(
      "SELECT id, nombre FROM grupos",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const groupNameToId = {};
    groups.forEach((g) => {
      groupNameToId[g.nombre] = g.id;
    });

    const csvGroupIdToDbId = {};
    for (const row of gruposData) {
      const csvId = row.id;
      const nombre = row.nombre;
      const dbId = groupNameToId[nombre];
      if (csvId && dbId) {
        csvGroupIdToDbId[csvId] = dbId;
      }
    }

    for (const row of filialesData) {
      const nombre = row.nombre;
      if (!nombre) continue;
      const csvGrupoId = row.grupoId;
      const grupoId = csvGroupIdToDbId[csvGrupoId];
      const extranjera = row.extranjera;

      const existingId = await queryInterface.rawSelect(
        "filiales",
        { where: { nombre } },
        ["id"]
      );

      if (!existingId) {
        await queryInterface.bulkInsert("filiales", [
          {
            nombre,
            grupoId,
            extranjera,
            createdAt: now,
            updatedAt: now,
          },
        ]);
      } else {
        await queryInterface.bulkUpdate(
          "filiales",
          { grupoId, extranjera, updatedAt: now },
          { id: existingId }
        );
      }
    }

    const filiales = await queryInterface.sequelize.query(
      "SELECT id, nombre FROM filiales",
      { type: Sequelize.QueryTypes.SELECT }
    );
    const filialNameToId = {};
    filiales.forEach((f) => {
      filialNameToId[f.nombre] = f.id;
    });

    const csvFilialIdToDbId = {};
    for (const row of filialesData) {
      const csvId = row.id;
      const nombre = row.nombre;
      const dbId = filialNameToId[nombre];
      if (csvId && dbId) {
        csvFilialIdToDbId[csvId] = dbId;
      }
    }

    for (const row of sucursalesData) {
      const nombre = row.nombre;
      if (!nombre) continue;
      const csvFilialId = row.filialId;
      const filialId = csvFilialIdToDbId[csvFilialId];

      const existingId = await queryInterface.rawSelect(
        "sucursales",
        { where: { nombre, filialId } },
        ["id"]
      );

      if (!existingId) {
        await queryInterface.bulkInsert("sucursales", [
          {
            nombre,
            filialId,
            createdAt: now,
            updatedAt: now,
          },
        ]);
      } else {
        await queryInterface.bulkUpdate(
          "sucursales",
          { filialId, updatedAt: now },
          { id: existingId }
        );
      }
    }
  },

  async down(queryInterface, Sequelize) {
  },
};
