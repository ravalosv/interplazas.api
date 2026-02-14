import { Request, Response } from "express";
import { PeriodoService } from "../services/periodo.service";
import { handleHttp } from "../core/utils/error.handle";

const service = new PeriodoService();

export const getPeriodos = async (req: Request, res: Response) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const createPeriodo = async (req: Request, res: Response) => {
  try {
    const { mes, anio } = req.body;
    if (!mes || !anio) {
      return res.status(400).json({ success: false, message: "Mes y Año son requeridos" });
    }
    const data = await service.create(Number(mes), Number(anio));
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const updatePeriodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await service.update(id, req.body);
    if (!data) return res.status(404).json({ success: false, message: "Periodo not found" });
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const cerrarPeriodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await service.cerrarPeriodo(id);
    if (!data) return res.status(404).json({ success: false, message: "Periodo not found" });
    res.json({ success: true, message: "Periodo cerrado exitosamente", data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const abrirPeriodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await service.abrirPeriodo(id);
    if (!data) return res.status(404).json({ success: false, message: "Periodo not found" });
    res.json({ success: true, message: "Periodo abierto exitosamente", data });
  } catch (error) {
    handleHttp(res, error);
  }
};
