'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('periodos', 'fecha_revision', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('periodos', 'fecha_reenvio_cedulas', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('periodos', 'fecha_visto_bueno', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('periodos', 'fecha_cierre_periodo', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('periodos', 'fecha_revision');
    await queryInterface.removeColumn('periodos', 'fecha_reenvio_cedulas');
    await queryInterface.removeColumn('periodos', 'fecha_visto_bueno');
    await queryInterface.removeColumn('periodos', 'fecha_cierre_periodo');
  }
};
