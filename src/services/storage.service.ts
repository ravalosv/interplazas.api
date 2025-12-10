import { IStorage } from "../data/interfaces/storage.interface";
import StorageModel from "../data/models/storage.model";

const registerUpload = async ({ fileName, idUser, path }: IStorage) => {
  const responseItem = await StorageModel.create({ fileName, idUser, path });
  return responseItem;
};

export { registerUpload };
