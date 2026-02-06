import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as filialService from "../services/filial.service";

export const consultarContrato = async (req: Request, res: Response) => {
  try {
    const { filialId, contrato } = req.body;

    if (!filialId || !contrato) {
      throw new Error("Se requieren 'filialId' y 'contrato'.");
    }

    const filial = await filialService.getFilialById(Number(filialId));

    if (!filial) {
      throw new Error("Filial no encontrada.");
    }

    if (!filial.apiUrl) {
      throw new Error("La filial no tiene API URL configurada.");
    }

    const urlTemplate = filial.apiUrl.trim();
    let url = '';

    if (urlTemplate.includes('{contrato}')) {
      url = urlTemplate.replace('{contrato}', contrato);
    } else {
      const baseUrl = urlTemplate.replace(/\/$/, '');
      url = `${baseUrl}/contratos/info/1/${contrato}`;
    }

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (filial.apiKey) {
        // @ts-ignore
        headers['api-key'] = filial.apiKey.trim();
    }

    console.log(`[Proxy] Consultando URL: ${url}`);

    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    });

    const data = await response.json();

    if (!response.ok) {
        console.error(`[Proxy] Error respuesta externa: ${response.status}`, data);
        const ret: ApiReturnPayload = { 
            success: false, 
            error: data.error || `Error remoto: ${response.statusText}` 
        };
        return res.send(ret);
    }

    const ret: ApiReturnPayload = { success: true, data: data.data || data };
    return res.send(ret);

  } catch (error: any) {
    console.error('[Proxy] Error interno:', error);
    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
