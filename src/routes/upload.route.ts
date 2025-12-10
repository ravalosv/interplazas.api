import { Router } from "express";
import { getFile } from "../controller/upload.controller";
import multerMiddleware from "../core/middleware/file.middleware";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.post("/", checkJwt, multerMiddleware.single("myfile"), getFile);

export { router };
