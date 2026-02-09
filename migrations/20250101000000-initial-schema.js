'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Grupos
    await queryInterface.createTable('grupos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cobroEntreFiliales: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 2. Tipos Usuarios
    await queryInterface.createTable('tipos_usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 3. Tipos Documentos
    await queryInterface.createTable('tipos_documentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 4. Tipos Servicios
    await queryInterface.createTable('tipos_servicios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 5. Conceptos
    await queryInterface.createTable('conceptos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      montoMXN: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      montoUSD: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 6. Motivos No Otorgados
    await queryInterface.createTable('motivos_no_otorgados', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 7. Estado Cta Status
    await queryInterface.createTable('estado_cta_status', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 8. Status Contrato
    await queryInterface.createTable('status_contrato', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 9. Canales Comunicacion
    await queryInterface.createTable('canales_comunicacion', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      whatsApp: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 10. Costos
    await queryInterface.createTable('costos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      costo_servicio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 11. Settings
    await queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      comisionPF: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 12. Tipo Movimientos Estado Cuenta
    await queryInterface.createTable('tipo_movimientos_estado_cuenta', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      naturaleza: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 13. Periodos
    await queryInterface.createTable('periodos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mes: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      estadoCuentaGenerado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 14. Filiales
    await queryInterface.createTable('filiales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grupoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'grupos',
          key: 'id',
        },
      },
      extranjera: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      utilizaApi: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      apiUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      apiKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 15. Sucursales
    await queryInterface.createTable('sucursales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'filiales',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 16. Usuarios
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipoUsuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipos_usuarios',
          key: 'id',
        },
      },
      filialId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'filiales',
          key: 'id',
        },
      },
      isDisabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      createdByUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 17. Cedulas
    await queryInterface.createTable('cedulas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      periodoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'periodos',
          key: 'id',
        },
      },
      periodoNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      filialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'filiales',
          key: 'id',
        },
      },
      filialNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      grupoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      grupoNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      subTotalFavor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      subTotalPagar: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      totalUsa: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      totalComisiones: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      comisionPF: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      saldosEfectivamenteCobradosFavor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      saldosEfectivamenteCobradosPagar: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      saldosEfectivamenteCobradosTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      totalMontoContrato: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      totalFinal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 18. Servicios
    await queryInterface.createTable('servicios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      canalComunicacionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'canales_comunicacion', key: 'id' },
      },
      fo_Sucursal_otorgante_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sucursales', key: 'id' },
      },
      fo_Sucursal_Origen_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sucursales', key: 'id' },
      },
      fo_Contrato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Nombre_Titular: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Nombre_Finado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Documento_Cliente_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tipos_documentos', key: 'id' },
      },
      fo_Documento_Cliente_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Monto_devuelto_documento_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Monto_Devuelto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      fo_Jefe_Turno_Nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Jefe_Turno_Puesto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Jefe_Turno_WhatsApp: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Fecha_Servicio: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      fori_Status_Contrato_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'status_contrato', key: 'id' },
      },
      fori_Saldo_Contrato: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      fori_Acepta_Convenio: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      fori_Otorga_Info_Nombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fori_Otorga_Info_Puesto: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fori_Otorga_Info_Telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fo_Contrato_Monto_Recuperado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      fo_Contrato_Monto_Convenio: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      fo_Tipo_Servicio_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tipos_servicios', key: 'id' },
      },
      fo_Concepto_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'conceptos', key: 'id' },
      },
      exp_Solicitud_Servicio_Status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'estado_cta_status', key: 'id' },
      },
      exp_Solicitud_Servicio_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exp_Comprobante_Pago_Status_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'estado_cta_status', key: 'id' },
      },
      exp_Comprobante_Pago_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exp_Convenio_Status_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'estado_cta_status', key: 'id' },
      },
      exp_Convenio_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exp_Enviado_Grupo_Whats: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      exp_Motivo_De_No_Otorgado_Id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'motivos_no_otorgados', key: 'id' },
      },
      exp_Expediente_Completo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      exp_Observaciones_cierre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      penalizado: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      PeriodoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'periodos', key: 'id' },
      },
      Usuario_CapturaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
      },
      Fecha_Captura: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 19. Cedula Detalles
    await queryInterface.createTable('cedula_detalles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cedulaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'cedulas', key: 'id' },
      },
      servicioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'servicios', key: 'id' },
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      monto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sucursalOrigenNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sucursalOrigenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sucursales', key: 'id' },
      },
      sucursalOtorganteId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sucursales', key: 'id' },
      },
      sucursalOtorganteNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      titular: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      finado: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contrato: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      conceptoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'conceptos', key: 'id' },
      },
      conceptoNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      saldoPABS: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      observacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      penalizado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      esFilialesHermanas: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      saldoEfectivamenteCobrado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      montoEnContrato: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoDevuelto: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      aceptaConvenio: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 20. Servicios Observaciones
    await queryInterface.createTable('servicios_observaciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      observacion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' },
      },
      servicioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'servicios', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });

    // 21. Estado Cuenta Movimientos
    await queryInterface.createTable('estado_cuenta_movimientos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      tipoMovimientoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tipo_movimientos_estado_cuenta', key: 'id' },
      },
      montoMXNAbs: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoUSDAbs: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoMXN: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      montoUSD: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      periodoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'periodos', key: 'id' },
      },
      cedulaId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'cedulas', key: 'id' },
      },
      grupoId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'grupos', key: 'id' },
      },
      filialId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'filiales', key: 'id' },
      },
      sucursalId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'sucursales', key: 'id' },
      },
      grupoNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      filialNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      sucursalNombre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      observacion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      referencia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comprobanteUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'usuarios', key: 'id' },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop in reverse order
    await queryInterface.dropTable('estado_cuenta_movimientos');
    await queryInterface.dropTable('servicios_observaciones');
    await queryInterface.dropTable('cedula_detalles');
    await queryInterface.dropTable('servicios');
    await queryInterface.dropTable('cedulas');
    await queryInterface.dropTable('usuarios');
    await queryInterface.dropTable('sucursales');
    await queryInterface.dropTable('filiales');
    await queryInterface.dropTable('periodos');
    await queryInterface.dropTable('tipo_movimientos_estado_cuenta');
    await queryInterface.dropTable('settings');
    await queryInterface.dropTable('costos');
    await queryInterface.dropTable('canales_comunicacion');
    await queryInterface.dropTable('status_contrato');
    await queryInterface.dropTable('estado_cta_status');
    await queryInterface.dropTable('motivos_no_otorgados');
    await queryInterface.dropTable('conceptos');
    await queryInterface.dropTable('tipos_servicios');
    await queryInterface.dropTable('tipos_documentos');
    await queryInterface.dropTable('tipos_usuarios');
    await queryInterface.dropTable('grupos');
  }
};
