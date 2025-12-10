import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.handle";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../../data/interfaces/requestExt.interface";
import jwt from "jsonwebtoken";
import Joi from "joi";

const checkJwt = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";

    const jwt = jwtByUser.split(" ").pop();

    const isUser = await verifyToken(`${jwt}`);

    if (!isUser.success) {
      if (isUser.error === "jwt expired") {
        res.status(401).send({ message: "Token expired" });
        return;
      } else {
        res.status(401).send({ message: "Unauthorized" });
        return;
      }
    }

    req.user = isUser.data as JwtPayload;

    /*     if (!isUser) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    } */

    req.user = isUser.data as JwtPayload;

    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const checkRole = (roles: string[]) => async (req: RequestExt, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "No token provided." });
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "");
    const userRole = decodedToken.role;

    if (!roles.includes(userRole)) {
      return res.status(403).send({ message: "Forbidden." });
    }

    next();
  } catch (error) {
    return res.status(401).send({ message: "Invalid token." });
  }
};

const validateSchema = (schema: Joi.ObjectSchema) => (req: RequestExt, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    console.log(errorMessages);
    res.status(400).send(errorMessages);
  } else {
    next();
  }
};

export { checkJwt, checkRole, validateSchema };
