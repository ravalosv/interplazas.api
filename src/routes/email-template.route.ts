import { Router } from "express";
import { getItems } from "../controller/email-template.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, getItems);

export { router };
