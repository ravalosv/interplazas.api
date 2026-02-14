'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // update servicioscci.grupos set cedula_template_id = 7 where id > 0;
    await queryInterface.bulkUpdate('grupos', 
      { cedula_template_id: 7 },
      { id: { [Sequelize.Op.gt]: 0 } }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('grupos', 
      { cedula_template_id: null },
      { id: { [Sequelize.Op.gt]: 0 } }
    );
  }
};
