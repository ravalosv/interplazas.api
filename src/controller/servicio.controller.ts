import { Request, Response } from "express";
import { ServicioService } from "../services/servicio.service";
import * as servicioObservacionService from "../services/servicio-observacion.service";
import { RequestExt } from "../data/interfaces/requestExt.interface";
import { handleHttp } from "../core/utils/error.handle";

const service = new ServicioService();

export const getServicios = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const getServiciosByMonthYear = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.params;
    if (!month || !year) {
      return res.status(400).json({ success: false, message: "Month and Year are required" });
    }
    const data = await service.getByMonthYear(Number(month), Number(year));
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const getServiciosByPeriodo = async (req: Request, res: Response) => {
  try {
    const { periodoId } = req.params;
    if (!periodoId) {
      return res.status(400).json({ success: false, message: "periodoId is required" });
    }
    const data = await service.getByPeriodoId(Number(periodoId));
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const createServicio = async (req: RequestExt, res: Response) => {
  try {
    const { fo_Sucursal_otorgante_Id, fo_Sucursal_Origen_Id } = req.body;
    if (Number(fo_Sucursal_otorgante_Id) === Number(fo_Sucursal_Origen_Id)) {
      return res.status(400).json({ success: false, message: "La Sucursal Otorgante y la Sucursal Origen no pueden ser la misma." });
    }
    const userId = Number(req.user?.id); // Obtener ID del usuario desde el token
    const file = req.file; // From multer
    const data = await service.create(req.body, userId, file);
    res.status(201).json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const getServicioById = async (req: Request, res: Response) => {
  try {
    const data = await service.getById(Number(req.params.id));
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const updateServicio = async (req: Request, res: Response) => {
  try {
    const { fo_Sucursal_otorgante_Id, fo_Sucursal_Origen_Id } = req.body;
    if (fo_Sucursal_otorgante_Id && fo_Sucursal_Origen_Id && Number(fo_Sucursal_otorgante_Id) === Number(fo_Sucursal_Origen_Id)) {
      return res.status(400).json({ success: false, message: "La Sucursal Otorgante y la Sucursal Origen no pueden ser la misma." });
    }
    const data = await service.update(Number(req.params.id), req.body);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const updatePenalizadoStatus = async (req: Request, res: Response) => {
  try {
    const { penalizado } = req.body;
    if (typeof penalizado !== "boolean") {
      return res.status(400).json({ success: false, message: "Field 'penalizado' must be a boolean" });
    }
    const data = await service.updatePenalizadoStatus(Number(req.params.id), penalizado);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const deleteServicio = async (req: Request, res: Response) => {
  try {
    const success = await service.delete(Number(req.params.id));
    if (!success) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fieldName } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ success: false, message: "File is required" });
    if (!fieldName) return res.status(400).json({ success: false, message: "fieldName is required" });

    const data = await service.uploadDocument(Number(id), fieldName, file);
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const { id, fieldName } = req.params;
    if (!fieldName) return res.status(400).json({ success: false, message: "fieldName is required" });

    const success = await service.deleteDocument(Number(id), fieldName);
    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const getServicioObservaciones = async (req: Request, res: Response) => {
  try {
    const servicioId = Number(req.params.id);
    const data = await servicioObservacionService.getObservacionesByServicio(servicioId);
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const createServicioObservacion = async (req: RequestExt, res: Response) => {
  try {
    const servicioId = Number(req.params.id);
    const usuarioId = Number(req.user?.id);
    const { observacion } = req.body;
    const data = await servicioObservacionService.createObservacion(servicioId, usuarioId, observacion);
    res.status(201).json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const deleteServicioObservacion = async (req: Request, res: Response) => {
  try {
    const observacionId = Number(req.params.observacionId);
    const success = await servicioObservacionService.deleteObservacion(observacionId);
    if (!success) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    handleHttp(res, error);
  }
};
