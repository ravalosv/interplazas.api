import { Request } from "express";
import multer, { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

const PATH_STORAGE = `${process.cwd()}/storage`;

const storage = diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: Express.Multer.File, cb: any) {
    const ext = file.originalname.split(".").pop();
    const fileNameRandom = `${file.originalname}-image-${Date.now()}.${ext}`;
    cb(null, fileNameRandom);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes"), false);
  }
};

/* EXCEL */
const excelStorage = diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: Express.Multer.File, cb: any) {
    const uniqueId = uuidv4();

    const ext = file.originalname.split(".").pop();

    const filePath = `${uniqueId}.${ext}`;

    cb(null, filePath);
  },
});

const excelfileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file.mimetype === "application/vnd.ms-excel") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos Excel"), false);
  }
};

/* COMPROBANTE - Images and PDFs */
const comprobanteStorage = diskStorage({
  destination(req: Request, file: Express.Multer.File, cb: any) {
    cb(null, PATH_STORAGE);
  },
  filename(req: Request, file: Express.Multer.File, cb: any) {
    const uniqueId = uuidv4();
    const ext = file.originalname.split(".").pop();
    const filePath = `comprobante-${uniqueId}.${ext}`;
    cb(null, filePath);
  },
});

const comprobanteFileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes y archivos PDF"), false);
  }
};

const multerMiddleware = multer({ storage: storage, fileFilter: fileFilter });

export const multerExcelMiddleware = multer({ storage: excelStorage, fileFilter: excelfileFilter });
export const multerComprobanteMiddleware = multer({ storage: comprobanteStorage, fileFilter: comprobanteFileFilter });
export { multerMiddleware };

export default multerMiddleware;
