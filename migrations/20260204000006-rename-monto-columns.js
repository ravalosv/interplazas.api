'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoMXN', 'montoMXNAbs');
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoUSD', 'montoUSDAbs');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoMXNAbs', 'montoMXN');
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoUSDAbs', 'montoUSD');
  }
};
