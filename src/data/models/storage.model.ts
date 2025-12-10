import { Schema, Types, model, Model } from "mongoose";
import { IStorage } from "../interfaces/storage.interface";

const StorageSchema = new Schema<IStorage>(
  {
    fileName: {
      type: String,
    },
    idUser: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const StorageModel = model("storage", StorageSchema);
export default StorageModel;
