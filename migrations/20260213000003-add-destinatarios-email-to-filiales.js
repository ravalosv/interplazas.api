'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('filiales', 'destinatarios_email', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Lista de correos destinatarios separados por coma'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('filiales', 'destinatarios_email');
  }
};
