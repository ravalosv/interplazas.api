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
