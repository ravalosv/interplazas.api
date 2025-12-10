import { Router, Request, Response } from "express";
import * as authController from "../controller/auth.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

/**
 * @route POST /auth/login
 */
router.post("/login", (req, res, next) => {
  authController
    .login(req, res)
    .then((data) => {})
    .catch(next);
});

/**
 * @route POST /auth/register
 */
router.post("/register", checkJwt, checkRole(["admin"]), (req, res, next) => {
  authController
    .register(req, res)
    .then((data) => {})
    .catch(next);
});

/**
 * @route PUT /auth/change-password
 */
router.put("/change-password", checkJwt, checkRole(["admin"]), (req, res, next) => {
  authController
    .changePassword(req, res)
    .then((data) => {})
    .catch(next);
});

/**
 * @route POST /auth/refresh-token
 */
router.post("/renew-token/", (req, res, next) => {
  authController
    .renewToken(req, res)
    .then((data) => {})
    .catch(next);
});

export { router };
