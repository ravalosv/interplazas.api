import { Router } from "express";
import { getVersion } from "../controller/version.controller";

const router = Router();

router.get("/", getVersion);

export default router;
