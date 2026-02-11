import { Router } from "express";
import * as sucursalController from "../controller/sucursal.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3, 4]), sucursalController.getSucursales);
router.get("/:id", checkJwt, checkRole([1, 3]), sucursalController.getSucursal);
router.post("/", checkJwt, checkRole([1, 3]), sucursalController.createSucursal);
router.put("/:id", checkJwt, checkRole([1, 3]), sucursalController.updateSucursal);
router.delete("/:id", checkJwt, checkRole([1, 3]), sucursalController.deleteSucursal);

export { router };

