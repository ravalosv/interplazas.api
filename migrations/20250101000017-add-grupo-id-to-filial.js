'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('filiales', 'grupoId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'grupos',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('filiales', 'grupoId');
  }
};
