import { Request, Response } from "express";
import { ServicioService } from "../services/servicio.service";
import { RequestExt } from "../data/interfaces/requestExt.interface";

const service = new ServicioService();

export const getServicios = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
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
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const createServicio = async (req: RequestExt, res: Response) => {
  try {
    const userId = Number(req.user?.id); // Obtener ID del usuario desde el token
    const data = await service.create(req.body, userId);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const getServicioById = async (req: Request, res: Response) => {
  try {
    const data = await service.getById(Number(req.params.id));
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const updateServicio = async (req: Request, res: Response) => {
  try {
    const data = await service.update(Number(req.params.id), req.body);
    if (!data) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
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
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const deleteServicio = async (req: Request, res: Response) => {
  try {
    const success = await service.delete(Number(req.params.id));
    if (!success) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
