'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('filiales');
    if (!table['cedula_destinatarios_email']) {
      await queryInterface.addColumn('filiales', 'cedula_destinatarios_email', {
        type: Sequelize.TEXT,
        allowNull: true,
        comment: 'Lista de correos para envío de cédula (separados por coma)',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('filiales');
    if (table['cedula_destinatarios_email']) {
      await queryInterface.removeColumn('filiales', 'cedula_destinatarios_email');
    }
  },
};
