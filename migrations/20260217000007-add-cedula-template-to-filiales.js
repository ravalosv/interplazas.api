'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('filiales');
    if (!table['cedula_template_id']) {
      await queryInterface.addColumn('filiales', 'cedula_template_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'email_templates',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable('filiales');
    if (table['cedula_template_id']) {
      await queryInterface.removeColumn('filiales', 'cedula_template_id');
    }
  },
};
