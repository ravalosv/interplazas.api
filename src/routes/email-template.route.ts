import { Router } from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controller/email-template.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, checkRole([1, 3]), getItems);
router.get("/:id", checkJwt, checkRole([1, 3]), getItem);
router.post("/", checkJwt, checkRole([1, 3]), createItem);
router.put("/:id", checkJwt, checkRole([1, 3]), updateItem);
router.delete("/:id", checkJwt, checkRole([1, 3]), deleteItem);

export { router };
