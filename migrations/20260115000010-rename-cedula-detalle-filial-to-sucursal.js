'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cedula_detalles_tmp', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cedulaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cedulas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      servicioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'servicios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sucursalOrigenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      sucursalOtorganteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    await queryInterface.sequelize.query(`
      INSERT INTO cedula_detalles_tmp
        (id, cedulaId, servicioId, tipo, monto, sucursalOrigenId, sucursalOtorganteId, createdAt, updatedAt)
      SELECT
        id, cedulaId, servicioId, tipo, monto, filialOrigenId, filialOtorganteId, createdAt, updatedAt
      FROM cedula_detalles;
    `);

    await queryInterface.dropTable('cedula_detalles');
    await queryInterface.renameTable('cedula_detalles_tmp', 'cedula_detalles');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.createTable('cedula_detalles_old', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cedulaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cedulas',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      servicioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'servicios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      filialOrigenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'filiales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      filialOtorganteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'filiales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    await queryInterface.sequelize.query(`
      INSERT INTO cedula_detalles_old
        (id, cedulaId, servicioId, tipo, monto, filialOrigenId, filialOtorganteId, createdAt, updatedAt)
      SELECT
        id, cedulaId, servicioId, tipo, monto, sucursalOrigenId, sucursalOtorganteId, createdAt, updatedAt
      FROM cedula_detalles;
    `);

    await queryInterface.dropTable('cedula_detalles');
    await queryInterface.renameTable('cedula_detalles_old', 'cedula_detalles');
  },
};
