import { Router } from "express";
import * as statusController from "../controller/status.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3, 4]), statusController.getStatus);
router.get("/:id", checkJwt, checkRole([1, 3]), statusController.getStatusItem);
router.post("/", checkJwt, checkRole([1, 3]), statusController.createStatusItem);
router.put("/:id", checkJwt, checkRole([1, 3]), statusController.updateStatusItem);
router.delete("/:id", checkJwt, checkRole([1, 3]), statusController.deleteStatusItem);

export { router };
