import { Response } from "express";
import { ApiReturnPayload } from "../../data/payloads/api-return.payload";
import { colors } from "./color";

const errorMessages: { [key: string]: string } = {
  ER_ROW_IS_REFERENCED_2: "No se puede eliminar el registro porque contiene dependencias.",
  ER_NO_REFERENCED_ROW_2:
    "No se puede completar la operación porque uno de los registros referenciados no existe. Por favor, verifica que todos los datos ingresados sean correctos y que las referencias sean válidas.",
  // otros códigos de error...
};

function getErrorMessage(errorCode: string): string {
  return errorMessages[errorCode] || "Ha ocurrido un error desconocido. Por favor, inténtalo de nuevo más tarde.";
}

const handleHttpException = (res: Response, error: any, errorRaw?: any) => {
  let errorMessage = "INTERNAL_SERVER_ERROR";

  const errorCode = error.code || error.parent?.code;

  // Default to 500
  let statusCode = 500;

  if (errorCode) {
    errorMessage = getErrorMessage(errorCode);
  } else if (error instanceof Error) {
    // Si es un error genérico (lanzado con new Error()) o de validación de Sequelize, asumimos Bad Request
    if (error.name === 'Error' || error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      statusCode = 400;
      errorMessage = error.message;
    } else {
      errorMessage = error.message;
    }
  }

  console.log(colors.BLINK(colors.BRIGHT_RED("****** EXCEPTION *******")));
  console.log(colors.BRIGHT_RED(`CODE: `), colors.YELLOW(`${error.code || error.parent?.code}`));
  console.log(colors.BRIGHT_RED(`NAME: `), colors.YELLOW(`${error.name}`));

  console.log(colors.BRIGHT_RED(`TABLE: `), colors.YELLOW(`${error.table}`));
  console.log(colors.BRIGHT_RED(`FIELDS: `), colors.YELLOW(`${error.fields}`));
  console.log(colors.BRIGHT_RED(`MESSAGE: `), colors.YELLOW(`${error.message}`));
  console.log(colors.BRIGHT_RED("************************"));

  const apiReturnPayload: ApiReturnPayload = {
    success: false,
    error: errorMessage,
  };

  res.status(statusCode).send(apiReturnPayload);
};

export { handleHttpException as handleHttp };
