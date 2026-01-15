'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('servicios', 'fo_Fecha_Servicio', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('servicios', 'fo_Fecha_Servicio', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
