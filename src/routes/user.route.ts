import { Router, Request, Response } from "express";
import * as usersController from "../controller/user.controller";
import { checkJwt, checkRole } from "../core/middleware/session.middleware";

const router = Router();

/**
 * @route GET /user/
 * @route GET /user?filter=active  // get only active users
 * @route GET /user?filter=inactive  // get only inactive users
 */
router.get("/", checkJwt, checkRole([1]), usersController.getUsers);

/**
 * @route GET /user/:id
 */
router.get("/:id", checkJwt, checkRole([1]), usersController.getUser);

/**
 * @route PUT /user/:id
 */
router.put("/:id", checkJwt, checkRole([1]), usersController.updateUser);

/**
 * @route DELETE /user/:id
 */
router.delete("/:id", checkJwt, checkRole([1]), usersController.disableUser);

/**
 * @route PUT /user/:id
 */
router.put("/:id/activate", checkJwt, checkRole([1]), usersController.activateUser);

export { router };
