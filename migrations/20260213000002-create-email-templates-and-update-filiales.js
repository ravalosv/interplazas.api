'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Create email_templates table
    await queryInterface.createTable('email_templates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      from: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      template: {
        type: Sequelize.TEXT,
        allowNull: false,
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
      }
    });

    // 2. Add foreign key columns to filiales table
    await queryInterface.addColumn('filiales', 'templateSaldoPabsCero', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'email_templates',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('filiales', 'templateSaldoPabsConConvenio', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'email_templates',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('filiales', 'templateSaldoPabsSinConvenio', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'email_templates',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('filiales', 'templateSaldoPabsParcial', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'email_templates',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Remove foreign key columns from filiales table
    await queryInterface.removeColumn('filiales', 'templateSaldoPabsCero');
    await queryInterface.removeColumn('filiales', 'templateSaldoPabsConConvenio');
    await queryInterface.removeColumn('filiales', 'templateSaldoPabsSinConvenio');
    await queryInterface.removeColumn('filiales', 'templateSaldoPabsParcial');

    // 2. Drop email_templates table
    await queryInterface.dropTable('email_templates');
  }
};
