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

  errorMessage = getErrorMessage(errorCode);
  /*   // Verificar si el error es una violación de clave foránea
  if (error.parent && error.parent.code === "ER_ROW_IS_REFERENCED_2") {
    errorMessage = "No se puede eliminar el registro porque contiene dependencias.";
  } else if (error.parent && error.parent.code === "ER_NO_REFERENCED_ROW_2") {
    console.log('error', error.fields);
    errorMessage = "No se puede actualizar el registro porque contiene dependencias.";
  } else {
    errorMessage = error.message || errorMessage;
  } */

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

  res.send(apiReturnPayload);
};

export { handleHttpException as handleHttp };
