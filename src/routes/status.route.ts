import { Router } from "express";
import * as statusController from "../controller/status.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1]), statusController.getStatus);
router.get("/:id", checkJwt, checkRole([1]), statusController.getStatusItem);
router.post("/", checkJwt, checkRole([1]), statusController.createStatusItem);
router.put("/:id", checkJwt, checkRole([1]), statusController.updateStatusItem);
router.delete("/:id", checkJwt, checkRole([1]), statusController.deleteStatusItem);

export { router };
