'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoMXNConSigno', 'montoMXN');
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoUSDConSigno', 'montoUSD');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoMXN', 'montoMXNConSigno');
    await queryInterface.renameColumn('estado_cuenta_movimientos', 'montoUSD', 'montoUSDConSigno');
  }
};
