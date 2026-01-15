'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'servicios',
      'exp_Convenio_File_Name',
      'exp_Convenio_url'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn(
      'servicios',
      'exp_Convenio_url',
      'exp_Convenio_File_Name'
    );
  }
};

