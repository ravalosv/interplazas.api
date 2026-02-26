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
    
    let prefix = file.originalname.replace(/\.[^/.]+$/, "");

    if (req.body && req.body.fieldName) {
      const fieldName = req.body.fieldName;
      const fileMap: { [key: string]: string } = {
         'exp_Solicitud_Servicio_url': 'Solicitud_Servicio',
         'exp_Comprobante_Pago_url': 'Comprobante_Pago',
         'exp_Convenio_url': 'Convenio',
         'fo_Documento_Cliente_url': 'Documento_Cliente',
         'fo_Monto_devuelto_documento_url': 'Monto_Devuelto_Doc',
         'exp_ine_responsable_url': 'INE_Responsable',
         'exp_comprobante_domicilio_resp_url': 'Comprobante_Domicilio_Resp',
         'exp_ine_aval_url': 'INE_Aval',
         'fori_estado_cuenta_url': 'Estado_Cuenta'
      };
      if (fileMap[fieldName]) {
         prefix = fileMap[fieldName];
      }
    } else if (req.query && req.query.fieldName) {
      const fieldName = req.query.fieldName as string;
      const fileMap: { [key: string]: string } = {
         'exp_Solicitud_Servicio_url': 'Solicitud_Servicio',
         'exp_Comprobante_Pago_url': 'Comprobante_Pago',
         'exp_Convenio_url': 'Convenio',
         'fo_Documento_Cliente_url': 'Documento_Cliente',
         'fo_Monto_devuelto_documento_url': 'Monto_Devuelto_Doc',
         'exp_ine_responsable_url': 'INE_Responsable',
         'exp_comprobante_domicilio_resp_url': 'Comprobante_Domicilio_Resp',
         'exp_ine_aval_url': 'INE_Aval',
         'fori_estado_cuenta_url': 'Estado_Cuenta'
      };
      if (fileMap[fieldName]) {
         prefix = fileMap[fieldName];
      }
    }

    const fileNameRandom = `${prefix}-${Date.now()}.${ext}`;
    cb(null, fileNameRandom);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.mimetype === "application/vnd.ms-excel"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes, archivos PDF y Excel"), false);
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
