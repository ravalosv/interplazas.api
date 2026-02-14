'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const emailTemplates = [
      {
        id: 1,
        nombre: 'Saldo PABS = 0',
        tipo: 'servicio',
        from: 'Interplaza@promotorafutura.com',
        titulo: 'SERVICIO CCI / {filial_origen} - {filial_otorgante}-{contrato}',
        template: 'servicios_1.html',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nombre: 'Saldo PABS mayor a $1 con convenio firmado',
        tipo: 'servicio',
        from: 'Interplaza@promotorafutura.com',
        titulo: 'SERVICIO CCI / {filial_origen} - {filial_otorgante}-{contrato}',
        template: 'servicios_2.html',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nombre: 'Saldo PABS mayor a $1 sin convenio (NO JMB)',
        tipo: 'servicio',
        from: 'Interplaza@promotorafutura.com',
        titulo: 'SERVICIO CCI / {filial_origen} - {filial_otorgante}-{contrato}',
        template: 'servicios_3.html',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nombre: 'Saldo PABS mayor a $1 sin convenio (JMB)',
        tipo: 'servicio',
        from: 'Interplaza@promotorafutura.com',
        titulo: 'SERVICIO CCI / {filial_origen} - {filial_otorgante}-{contrato}',
        template: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nombre: 'Saldo PABS mayor a $1 se cobró una parte y el resto quedó en convenio (NO JMB)',
        tipo: 'servicio',
        from: 'Interplaza@promotorafutura.com',
        titulo: 'SERVICIO CCI / {filial_origen} - {filial_otorgante}-{contrato}',
        template: 'servicios_4.html',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nombre: 'Saldo PABS mayor a $1 se cobró una parte y el resto quedó en convenio (JMB)',
        tipo: 'servicio',
        from: 'Interplaza@promotorafutura.com',
        titulo: 'SERVICIO CCI / {filial_origen} - {filial_otorgante}-{contrato}',
        template: 'servicios_5.html',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        nombre: 'Envio de Cédulas',
        tipo: 'cedula',
        from: 'Interplaza@promotorafutura.com',
        titulo: 'CÉDULA SERVICIOS CCI FILIAL, PERIODO: {periodo}',
        template: 'cedulas_1.html',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insertar los registros usando bulkInsert
    // Usamos updateOnDuplicate para permitir re-ejecución sin duplicados si los IDs ya existen
    await queryInterface.bulkInsert('email_templates', emailTemplates, {
      updateOnDuplicate: ['nombre', 'tipo', 'from', 'titulo', 'template', 'updatedAt']
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar los registros insertados
    await queryInterface.bulkDelete('email_templates', {
      id: [1, 2, 3, 4, 5, 6, 7]
    });
  }
};
