'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.sequelize.query(`
      UPDATE servicios
      SET fo_Contrato = NULLIF(TRIM(fo_Contrato), '')
      WHERE fo_Contrato IS NOT NULL;
    `);

    await queryInterface.addIndex('servicios', ['PeriodoId', 'fo_Contrato'], {
      unique: true,
      name: 'uniq_servicios_periodo_contrato',
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('servicios', 'uniq_servicios_periodo_contrato');
  }
};
