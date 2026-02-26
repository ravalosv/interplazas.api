import { ServicioLogModel } from "../data/models/models";

export class ServicioLogService {
  async logAction(servicioId: number, usuarioId: number, accion: string, detalles: string) {
    try {
      await ServicioLogModel.create({
        servicioId,
        usuarioId,
        accion,
        detalles,
        fecha: new Date(),
      });
    } catch (error) {
      console.error("Error logging action:", error);
      // We don't want to break the main flow if logging fails, but we should know about it.
    }
  }

  async getLogsByServicioId(servicioId: number) {
    return await ServicioLogModel.findAll({
      where: { servicioId },
      include: [
        { association: "usuario", attributes: ["id", "name", "email"] }
      ],
      order: [["fecha", "DESC"]],
    });
  }
}
