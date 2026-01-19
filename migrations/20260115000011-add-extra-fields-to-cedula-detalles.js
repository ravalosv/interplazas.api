'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cedula_detalles', 'sucursalOrigenNombre', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'sucursalOtorganteNombre', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'titular', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'finado', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'contrato', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'fecha', {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'conceptoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'conceptos',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('cedula_detalles', 'conceptoNombre', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'saldoPABS', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'observacion', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedula_detalles', 'saldoEfectivamenteCobrado', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cedula_detalles', 'saldoEfectivamenteCobrado');
    await queryInterface.removeColumn('cedula_detalles', 'observacion');
    await queryInterface.removeColumn('cedula_detalles', 'saldoPABS');
    await queryInterface.removeColumn('cedula_detalles', 'conceptoNombre');
    await queryInterface.removeColumn('cedula_detalles', 'conceptoId');
    await queryInterface.removeColumn('cedula_detalles', 'fecha');
    await queryInterface.removeColumn('cedula_detalles', 'contrato');
    await queryInterface.removeColumn('cedula_detalles', 'finado');
    await queryInterface.removeColumn('cedula_detalles', 'titular');
    await queryInterface.removeColumn('cedula_detalles', 'sucursalOtorganteNombre');
    await queryInterface.removeColumn('cedula_detalles', 'sucursalOrigenNombre');
  },
};

