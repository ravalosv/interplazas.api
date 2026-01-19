'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cedulas', 'filialNombre', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('cedulas', 'comisionPF', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cedulas', 'comisionPF');
    await queryInterface.removeColumn('cedulas', 'filialNombre');
  },
};

