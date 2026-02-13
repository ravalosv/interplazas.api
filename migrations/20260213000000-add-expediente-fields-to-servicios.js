'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('servicios', 'exp_ine_responsable_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('servicios', 'exp_comprobante_domicilio_resp_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('servicios', 'exp_ine_aval_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('servicios', 'fori_estado_cuenta_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('servicios', 'exp_ine_responsable_url');
    await queryInterface.removeColumn('servicios', 'exp_comprobante_domicilio_resp_url');
    await queryInterface.removeColumn('servicios', 'exp_ine_aval_url');
    await queryInterface.removeColumn('servicios', 'fori_estado_cuenta_url');
  }
};
