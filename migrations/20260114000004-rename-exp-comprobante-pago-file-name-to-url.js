'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'servicios',
      'exp_Comprobante_Pago_File_Name',
      'exp_Comprobante_Pago_url'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'servicios',
      'exp_Comprobante_Pago_url',
      'exp_Comprobante_Pago_File_Name'
    );
  }
};

