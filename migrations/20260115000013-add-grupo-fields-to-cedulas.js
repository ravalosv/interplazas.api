'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cedulas', 'grupoId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    
    await queryInterface.addColumn('cedulas', 'grupoNombre', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('cedulas', 'grupoId');
    await queryInterface.removeColumn('cedulas', 'grupoNombre');
  }
};
