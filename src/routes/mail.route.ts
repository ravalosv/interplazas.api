import { Router } from "express";
import { sendMailController } from "../controller/mail.controller";
import { checkJwt } from "../core/middleware/session.middleware";
import multerMiddleware from "../core/middleware/file.middleware";

const router = Router();

router.post("/", checkJwt, multerMiddleware.array("attachments"), sendMailController);

export { router };

