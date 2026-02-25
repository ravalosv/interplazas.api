'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('servicios', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'En Proceso',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('servicios', 'status');
  }
};
