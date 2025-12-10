interface Movimiento {
  invitadoId: number;
  accionId: number;
  accion_desc: string;
  detalles: string;
  createdAt: Date;
}

interface StatusFinal {
  invitadoId: number;
  accionId: number;
  accion_desc: string;
  detalles: string;
  createdAt: Date;
}

export const obtenerStatusFinal = (lista_movimientos: Movimiento[], listaInvitados: number[]): StatusFinal[] => {
  const status_final: StatusFinal[] = [];

  listaInvitados.forEach((invitadoId) => {
    const movimientosInvitado = lista_movimientos.filter((mov) => mov.invitadoId === invitadoId);

    let agregado = false;
    let eliminado = false;
    let habitacionAsignada = false;
    let mesaAsignada = false;
    let ultimoMovimientoHabitacion: Movimiento | null = null;
    let ultimoMovimientoMesa: Movimiento | null = null;

    movimientosInvitado.forEach((mov) => {
      if (mov.accionId === 1) agregado = true;
      if (mov.accionId === 3) eliminado = true;
      if (mov.accionId === 4) {
        habitacionAsignada = true;
        ultimoMovimientoHabitacion = mov;
      }
      if (mov.accionId === 5) habitacionAsignada = false;
      if (mov.accionId === 7) {
        mesaAsignada = true;
        ultimoMovimientoMesa = mov;
      }
      if (mov.accionId === 6) mesaAsignada = false;
    });

    if (agregado && !eliminado) {
      const movimientoCreacion = movimientosInvitado.find((mov) => mov.accionId === 1);
      if (movimientoCreacion) status_final.push(movimientoCreacion);
    }

    if (habitacionAsignada && ultimoMovimientoHabitacion) {
      status_final.push(ultimoMovimientoHabitacion);
    }

    if (mesaAsignada && ultimoMovimientoMesa) {
      status_final.push(ultimoMovimientoMesa);
    }
  });

  return status_final;
};
