'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Actualiza el status de todos los servicios existentes a 'En Proceso'
    await queryInterface.bulkUpdate('servicios', {
      status: 'En Proceso'
    }, {});
  },

  down: async (queryInterface, Sequelize) => {
    // No es posible revertir a un estado anterior desconocido.
    // Se deja vacío intencionalmente.
  }
};
