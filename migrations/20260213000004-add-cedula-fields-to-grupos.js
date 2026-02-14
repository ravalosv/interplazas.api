'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('grupos', 'cedula_destinatarios_email', {
      type: Sequelize.TEXT,
      allowNull: true,
      comment: 'Lista de correos destinatarios separados por coma para la cedula'
    });

    await queryInterface.addColumn('grupos', 'cedula_template_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'email_templates',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('grupos', 'cedula_template_id');
    await queryInterface.removeColumn('grupos', 'cedula_destinatarios_email');
  }
};
