'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. templateSaldoPabsCero = 1 para todas
    await queryInterface.bulkUpdate('filiales', 
      { templateSaldoPabsCero: 1 },
      { id: { [Sequelize.Op.gt]: 0 } }
    );

    // 2. templateSaldoPabsConConvenio = 2 para todas
    await queryInterface.bulkUpdate('filiales', 
      { templateSaldoPabsConConvenio: 2 },
      { id: { [Sequelize.Op.gt]: 0 } }
    );

    // 3. templateSaldoPabsSinConvenio = 3 donde grupoId <> 6
    await queryInterface.bulkUpdate('filiales', 
      { templateSaldoPabsSinConvenio: 3 },
      { grupoId: { [Sequelize.Op.ne]: 6 } }
    );

    // 4. templateSaldoPabsSinConvenio = 4 donde grupoId = 6
    await queryInterface.bulkUpdate('filiales', 
      { templateSaldoPabsSinConvenio: 4 },
      { grupoId: 6 }
    );

    // 5. templateSaldoPabsParcial = 5 donde grupoId <> 6
    await queryInterface.bulkUpdate('filiales', 
      { templateSaldoPabsParcial: 5 },
      { grupoId: { [Sequelize.Op.ne]: 6 } }
    );

    // 6. templateSaldoPabsParcial = 6 donde grupoId = 6
    await queryInterface.bulkUpdate('filiales', 
      { templateSaldoPabsParcial: 6 },
      { grupoId: 6 }
    );
  },

  async down (queryInterface, Sequelize) {
    // Revertir a NULL si es necesario
    await queryInterface.bulkUpdate('filiales', 
      { 
        templateSaldoPabsCero: null,
        templateSaldoPabsConConvenio: null,
        templateSaldoPabsSinConvenio: null,
        templateSaldoPabsParcial: null
      },
      { id: { [Sequelize.Op.gt]: 0 } }
    );
  }
};
