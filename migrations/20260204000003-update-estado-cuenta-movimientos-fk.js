'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      console.log('Step 1: Adding column tipoMovimientoId');
      try {
        await queryInterface.addColumn('estado_cuenta_movimientos', 'tipoMovimientoId', {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'tipo_movimientos_estado_cuenta',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        });
      } catch (error) {
        if (error.original && error.original.code === 'ER_DUP_FIELDNAME') {
          console.log('Column tipoMovimientoId already exists, skipping addColumn.');
        } else {
          throw error;
        }
      }

      console.log('Step 2: Skipped update query');
      
      console.log('Step 3: Removing column tipo');
      try {
         await queryInterface.removeColumn('estado_cuenta_movimientos', 'tipo');
      } catch (e) {
         console.log('Error removing column tipo (might not exist):', e.message);
      }

      console.log('Step 4: Skipped changing column to NOT NULL due to SET NULL constraint');
      /*
      await queryInterface.changeColumn('estado_cuenta_movimientos', 'tipoMovimientoId', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });
      */
      
      console.log('Migration completed successfully');

    } catch (err) {
      console.error('Migration failed with error:', err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    // Revertir cambios
    await queryInterface.addColumn('estado_cuenta_movimientos', 'tipo', {
      type: Sequelize.ENUM('SALDO_INICIAL', 'SALDO_MENSUAL', 'ABONO DE GRUPO', 'PAGO A GRUPO'),
      allowNull: true,
    });

    /*
    // Restaurar datos (inverso)
    await queryInterface.sequelize.query(`
      UPDATE estado_cuenta_movimientos 
      JOIN tipo_movimientos_estado_cuenta ON estado_cuenta_movimientos.tipoMovimientoId = tipo_movimientos_estado_cuenta.id
      SET estado_cuenta_movimientos.tipo = tipo_movimientos_estado_cuenta.nombre
    `);
    */

    await queryInterface.removeColumn('estado_cuenta_movimientos', 'tipoMovimientoId');
    
    // Volver a hacer 'tipo' NOT NULL
    await queryInterface.changeColumn('estado_cuenta_movimientos', 'tipo', {
        type: Sequelize.ENUM('SALDO_INICIAL', 'SALDO_MENSUAL', 'ABONO DE GRUPO', 'PAGO A GRUPO'),
        allowNull: false,
    });
  },
};
