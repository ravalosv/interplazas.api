'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cedulas', 'saldosEfectivamenteCobradosFavor', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('cedulas', 'saldosEfectivamenteCobradosPagar', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });

    await queryInterface.addColumn('cedulas', 'saldosEfectivamenteCobradosTotal', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cedulas', 'saldosEfectivamenteCobradosFavor');
    await queryInterface.removeColumn('cedulas', 'saldosEfectivamenteCobradosPagar');
    await queryInterface.removeColumn('cedulas', 'saldosEfectivamenteCobradosTotal');
  },
};
