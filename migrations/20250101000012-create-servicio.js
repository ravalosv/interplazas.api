'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('servicios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      canalComunicacionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'canales_comunicacion',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fo_Sucursal_otorgante_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fo_Sucursal_Origen_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'sucursales',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fo_Contrato: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fo_Nombre_Titular: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fo_Nombre_Finado: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fo_Documento_Cliente_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tipos_documentos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fo_Jefe_Turno_Nombre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fo_Jefe_Turno_Puesto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fo_Jefe_Turno_WhatsApp: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fo_Fecha_Servicio: {
        type: Sequelize.DATE,
        allowNull: true
      },
      fori_Status_Contrato_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'status_contrato',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fori_Saldo_Contrato: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      fori_Acepta_Convenio: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      fori_Otorga_Info_Nombre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fori_Otorga_Info_Puesto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fori_Otorga_Info_Telefono: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fo_Contrato_Monto_Recuperado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      fo_Contrato_Monto_Convenio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      fo_Tipo_Servicio_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tipos_servicios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fo_Concepto_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'conceptos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      exp_Solicitud_Servicio_Status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'estado_cta_status',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      exp_Solicitud_Servicio_File_Name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      exp_Comprobante_Pago_Status_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'estado_cta_status',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      exp_Comprobante_Pago_File_Name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      exp_Convenio_Status_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'estado_cta_status',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      exp_Convenio_File_Name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      exp_Enviado_Grupo_Whats: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      exp_Motivo_De_No_Otorgado_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'motivos_no_otorgados',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      exp_Expediente_Completo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      exp_Observaciones: {
        type: Sequelize.STRING,
        allowNull: true
      },
      penalizado: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      PeriodoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'periodos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Usuario_CapturaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Fecha_Captura: {
        type: Sequelize.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('servicios');
  }
};
