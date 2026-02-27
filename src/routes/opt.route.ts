import { Router } from "express";
import * as optController from "../controller/opt.controller";

const router = Router();

// Ping system status
router.get("/health", optController.validateConfig);

// System refresh (protected)
router.post("/refresh", optController.refreshCache);
router.post("/sync", optController.syncTime);

export { router };
