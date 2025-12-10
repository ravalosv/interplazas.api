import { Router } from "express";

const router = Router();

router.get("/check-health", (req, res, next) => {
  res.status(200).send("Eventos Service is running!");
});

export { router };
