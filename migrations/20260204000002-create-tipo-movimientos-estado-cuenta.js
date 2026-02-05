'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tipo_movimientos_estado_cuenta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      naturaleza: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '1: Deudora (Suma deuda), -1: Acreedora (Resta deuda)',
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

    // Insertar valores iniciales
    await queryInterface.bulkInsert('tipo_movimientos_estado_cuenta', [
      {
        nombre: 'SALDO_INICIAL',
        naturaleza: 1, // Deudora
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'SALDO_MENSUAL',
        naturaleza: 1, // Deudora
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'ABONO',
        naturaleza: -1, // Acreedora
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'PAGO',
        naturaleza: -1, // Acreedora
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tipo_movimientos_estado_cuenta');
  },
};
