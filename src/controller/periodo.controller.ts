import { Request, Response } from "express";
import { PeriodoService } from "../services/periodo.service";

const service = new PeriodoService();

export const getPeriodos = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const cerrarPeriodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await service.cerrarPeriodo(id);
    if (!data) return res.status(404).json({ success: false, message: "Periodo not found" });
    res.json({ success: true, message: "Periodo cerrado exitosamente", data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

export const abrirPeriodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await service.abrirPeriodo(id);
    if (!data) return res.status(404).json({ success: false, message: "Periodo not found" });
    res.json({ success: true, message: "Periodo abierto exitosamente", data });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
