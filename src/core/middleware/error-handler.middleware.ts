import { Request, Response, NextFunction } from "express";
import { ApiReturnPayload } from "../../data/payloads/api-return.payload";

const errorHandlerMiddleware = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack); // Registra el stack del error para depuración

  let errorMessage = err.message; //"¡Algo salió mal!";

  // Personaliza la respuesta según el tipo de error
  if (err.parent && err.parent.code === "ER_ROW_IS_REFERENCED_2") {
    errorMessage = "No se puede eliminar el registro porque contiene dependencias.";
  } else if (err.name === "ValidationError") {
    errorMessage = err.message;
  } else if (err.type === "entity.parse.failed") {
    errorMessage = "JSON inválido";
  }

  const apiReturnPayload: ApiReturnPayload = {
    success: false,
    error: errorMessage,
  };

  res.send(apiReturnPayload);
};

export { errorHandlerMiddleware };
