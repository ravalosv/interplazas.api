import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as filialService from "../services/filial.service";
import axios from "axios";
import { ConsultasContratosLogModel } from "../data/models/models";
import { RequestExt } from "../data/interfaces/requestExt.interface";

export const consultarContrato = async (req: Request, res: Response) => {
  let logEntry: any = {
    filialId: 0,
    apiUrl: '',
    resultado: '',
    usuarioId: 0
  };

  try {
    const { filialId, contrato } = req.body;
    const user = (req as RequestExt).user;

    if (!filialId || !contrato) {
      throw new Error("Se requieren 'filialId' y 'contrato'.");
    }

    logEntry.filialId = Number(filialId);
    logEntry.usuarioId = user?.id || 0;

    const filial = await filialService.getFilialById(Number(filialId));

    if (!filial) {
      throw new Error("Filial no encontrada.");
    }

    if (!filial.apiUrl) {
      throw new Error("La filial no tiene API URL configurada.");
    }

    const urlTemplate = filial.apiUrl.trim();
    let url = '';

    url = urlTemplate.replace('{contrato}', contrato);
    logEntry.apiUrl = url;

    const headers: any = {};

    if (filial.apiKey) {
        headers['api-key'] = filial.apiKey.trim();
    }

    console.log(`[Proxy] Consultando URL: ${url}`);
    
    const config = {
        headers: headers
    };

    const response = await axios.get(url, config);
    const data = response.data;

    if(data.success)
    {
        if(!data.data.otorgar_servicio){
        const ids = [33,34,35,36,37,38,39,40,41,42,43,44,45];
        if (ids.includes(Number(filialId))) {
          const status = data.data.status.toLowerCase();
          if (status === 'realizado' || status === 'realizado incobrable' || status === 'realizado percapita') {
            data.data.otorgar_servicio = false;
          } else {
            data.data.otorgar_servicio = true;
          }
        }
      }
    }

    logEntry.resultado = JSON.stringify(data).substring(0, 5000); // Limit length just in case

    // Save Log Success
    try {
      if (logEntry.usuarioId > 0) {
         await ConsultasContratosLogModel.create(logEntry);
      }
    } catch (logError) {
      console.error('Error saving log:', logError);
    }

    return res.send(data);

  } catch (error: any) {
    console.error('[Proxy] Error interno:', error.message);
    
    logEntry.resultado = `ERROR: ${error.message}`;
    if (axios.isAxiosError(error)) {
         logEntry.resultado += ` | AXIOS_DETAILS: ${JSON.stringify(error.response?.data)}`;
    }
    
    // Save Log Error
    try {
        if (logEntry.usuarioId > 0 && logEntry.filialId > 0 && logEntry.apiUrl) {
           await ConsultasContratosLogModel.create(logEntry);
        }
    } catch (logError) {
        console.error('Error saving log (on catch):', logError);
    }


    if (axios.isAxiosError(error)) {
        console.error('[Proxy] Axios Error Details:', error.response?.data);
        if(error.response?.data.error)
        {
          return res.send(error.response?.data);
        }

        const errorData = error.response?.data;
        const ret: ApiReturnPayload = { 
            success: false, 
            error: errorData?.error || error.message || "Error en petición remota"
        };
        return res.send(ret);
    }

    const ret: ApiReturnPayload = { success: false, error: error.message || "INTERNAL_SERVER_ERROR" };
    return res.send(ret);
  }
};
