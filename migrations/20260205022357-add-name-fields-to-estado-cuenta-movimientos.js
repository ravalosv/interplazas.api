'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('estado_cuenta_movimientos', 'grupoNombre', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('estado_cuenta_movimientos', 'filialNombre', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('estado_cuenta_movimientos', 'sucursalNombre', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('estado_cuenta_movimientos', 'grupoNombre');
    await queryInterface.removeColumn('estado_cuenta_movimientos', 'filialNombre');
    await queryInterface.removeColumn('estado_cuenta_movimientos', 'sucursalNombre');
  }
};
