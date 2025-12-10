import { Request, Response } from "express";
//import dbConnect from "../core/config/mongo";
import { handleHttp } from "../core/utils/error.handle";
import { IStorage } from "../data/interfaces/storage.interface";
import { RequestExt } from "../data/interfaces/requestExt.interface";
import { registerUpload } from "../services/storage.service";

const getFile = async (req: RequestExt, res: Response) => {
  try {
    const { user, file } = req;

    // aqui se pueden agregar validaciones de mimetype, tamaño, etc
    console.log(file);

    const dataToRegister: IStorage = {
      fileName: `${file?.filename}`,
      idUser: `${user?.id}`,
      path: `${file?.path}`,
    };
    const response = await registerUpload(dataToRegister);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_BLOG");
  }
};

export { getFile };
