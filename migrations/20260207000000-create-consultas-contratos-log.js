'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('consultas_contratos_log', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'filiales',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      apiUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resultado: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('consultas_contratos_log');
  }
};
