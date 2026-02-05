import { Request, Response } from "express";
import { EstadoCuentaService } from "../services/estado-cuenta.service";
import { ApiReturn } from "../data/payloads/api-return.payload";
import { RequestExt } from "../data/interfaces/requestExt.interface";

const service = new EstadoCuentaService();

export const generarEstadoCuenta = async (req: RequestExt, res: Response) => {
  try {
    const { periodoId } = req.body;
    
    if (!periodoId) {
      return res.status(400).json(ApiReturn.error("Se requiere el periodoId."));
    }

    // @ts-ignore
    const usuarioId = req.user?.id;
    if (!usuarioId) {
        return res.status(401).json(ApiReturn.error("Usuario no autenticado."));
    }

    const result = await service.generarEstadoCuenta(Number(periodoId), usuarioId);
    res.json(ApiReturn.success(result, "Estado de cuenta generado exitosamente."));
  } catch (error: any) {
    res.status(500).json(ApiReturn.error(error.message));
  }
};

export const getMovimientos = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllMovimientos();
    res.json(ApiReturn.success(data));
  } catch (error: any) {
    res.status(500).json(ApiReturn.error(error.message));
  }
};

export const getTiposMovimiento = async (req: Request, res: Response) => {
  try {
    const data = await service.getTiposMovimiento();
    res.json(ApiReturn.success(data));
  } catch (error: any) {
    res.status(500).json(ApiReturn.error(error.message));
  }
};

export const createMovimiento = async (req: RequestExt, res: Response) => {
  try {
    // @ts-ignore
    const usuarioId = req.user?.id;
    if (!usuarioId) {
        return res.status(401).json(ApiReturn.error("Usuario no autenticado."));
    }
    const data = await service.createMovimiento(req.body, usuarioId);
    res.json(ApiReturn.success(data, "Movimiento creado exitosamente."));
  } catch (error: any) {
    res.status(500).json(ApiReturn.error(error.message));
  }
};

export const updateMovimiento = async (req: RequestExt, res: Response) => {
  try {
    // @ts-ignore
    const usuarioId = req.user?.id;
    if (!usuarioId) {
      return res.status(401).json(ApiReturn.error("Usuario no autenticado."));
    }
    const { id } = req.params as any;
    const movimiento = await service.updateMovimiento(Number(id), req.body, usuarioId);
    res.json(ApiReturn.success(movimiento, "Movimiento actualizado exitosamente."));
  } catch (error: any) {
    res.status(500).json(ApiReturn.error(error.message));
  }
};
