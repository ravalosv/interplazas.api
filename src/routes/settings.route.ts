import { Router } from "express";
import * as settingsController from "../controller/settings.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3]), settingsController.getSettings);
router.get("/:id", checkJwt, checkRole([1, 3]), settingsController.getSetting);
router.post("/", checkJwt, checkRole([1, 3]), settingsController.createSetting);
router.put("/:id", checkJwt, checkRole([1, 3]), settingsController.updateSetting);
router.delete("/:id", checkJwt, checkRole([1, 3]), settingsController.deleteSetting);

export { router };
