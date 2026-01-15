'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'servicios',
      'exp_Solicitud_Servicio_File_Name',
      'exp_Solicitud_Servicio_url'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'servicios',
      'exp_Solicitud_Servicio_url',
      'exp_Solicitud_Servicio_File_Name'
    );
  }
};

