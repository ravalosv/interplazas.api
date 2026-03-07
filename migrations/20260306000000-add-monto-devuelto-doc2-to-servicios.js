'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('servicios', 'fo_Monto_devuelto_documento2_url', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('servicios', 'fo_Monto_devuelto_documento2_url');
  }
};
