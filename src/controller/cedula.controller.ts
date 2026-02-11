import { Request, Response } from "express";
import { CedulaService } from "../services/cedula.service";
import { handleHttp } from "../core/utils/error.handle";

const service = new CedulaService();

export const crearCedulas = async (req: Request, res: Response) => {
  try {
    const { anio, mes } = req.body;
    
    if (!anio || !mes) {
      return res.status(400).json({ success: false, message: "Año y mes son requeridos." });
    }

    const data = await service.crearCedulas(Number(anio), Number(mes));
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const eliminarCedulas = async (req: Request, res: Response) => {
  try {
    const { anio, mes } = req.body;
    
    if (!anio || !mes) {
      return res.status(400).json({ success: false, message: "Año y mes son requeridos." });
    }

    const data = await service.eliminarCedulas(Number(anio), Number(mes));
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const getCedulasByPeriodo = async (req: Request, res: Response) => {
  try {
    const periodoId = Number(req.params.periodoId);

    if (!periodoId) {
      return res
        .status(400)
        .json({ success: false, message: "El periodoId es requerido." });
    }

    const data = await service.getCedulasByPeriodo(periodoId);
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const getCedulasByPeriodoWithDetails = async (req: Request, res: Response) => {
  try {
    const periodoId = Number(req.params.periodoId);

    if (!periodoId) {
      return res
        .status(400)
        .json({ success: false, message: "El periodoId es requerido." });
    }

    const data = await service.getCedulasByPeriodoWithDetails(periodoId);
    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};

export const getCedulaById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "El id de la cédula es requerido." });
    }

    const data = await service.getCedulaById(id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Cédula no encontrada." });
    }

    res.json({ success: true, data });
  } catch (error) {
    handleHttp(res, error);
  }
};
