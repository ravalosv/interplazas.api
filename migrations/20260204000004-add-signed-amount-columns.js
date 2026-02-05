'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('estado_cuenta_movimientos', 'montoMXNConSigno', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('estado_cuenta_movimientos', 'montoUSDConSigno', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('estado_cuenta_movimientos', 'montoMXNConSigno');
    await queryInterface.removeColumn('estado_cuenta_movimientos', 'montoUSDConSigno');
  }
};
