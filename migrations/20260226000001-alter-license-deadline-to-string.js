'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change column type to STRING/TEXT to store encrypted value
    await queryInterface.changeColumn('settings', 'licenseDeadline', {
      type: Sequelize.STRING, // or TEXT if you expect very long strings
      allowNull: true,
      defaultValue: null // Remove default date value as we will encrypt it
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert back to DATEONLY (might fail if data is not a valid date)
    // This is risky if data is encrypted, but for down migration we can try
    // or just leave it as STRING.
    await queryInterface.changeColumn('settings', 'licenseDeadline', {
      type: Sequelize.DATEONLY,
      allowNull: true,
      defaultValue: '2026-04-15'
    });
  }
};
