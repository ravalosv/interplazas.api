'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('estado_cuenta_movimientos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      tipo: {
        type: Sequelize.ENUM('SALDO_INICIAL', 'SALDO_MENSUAL', 'ABONO', 'PAGO'),
        allowNull: false,
      },
      montoMXN: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoUSD: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      periodoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'periodos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      cedulaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'cedulas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      grupoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'grupos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      filialId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'filiales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sucursalId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'sucursales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      observacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referencia: {
        type: Sequelize.STRING, // Cheque, Transferencia ID, etc.
        allowNull: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('estado_cuenta_movimientos');
  },
};
