'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('servicios');
    if (table.exp_Observaciones) {
      await queryInterface.sequelize.query('ALTER TABLE `servicios` DROP COLUMN `exp_Observaciones`;');
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('servicios');
    if (!table.exp_Observaciones) {
      await queryInterface.addColumn('servicios', 'exp_Observaciones', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },
};
