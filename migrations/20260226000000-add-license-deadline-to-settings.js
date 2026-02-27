'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('settings', 'licenseDeadline', {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: '2026-04-15'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('settings', 'licenseDeadline');
  }
};
