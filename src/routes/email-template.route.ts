import { Router } from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controller/email-template.controller";
import { checkJwt } from "../core/middleware/session.middleware";

const router = Router();

router.get("/", checkJwt, getItems);
router.get("/:id", checkJwt, getItem);
router.post("/", checkJwt, createItem);
router.put("/:id", checkJwt, updateItem);
router.delete("/:id", checkJwt, deleteItem);

export { router };
