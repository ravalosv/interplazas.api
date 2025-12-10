import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";

export const register = async (req: Request, res: Response) => {
  try {
    const userId = authService.getUserId(req);

    const responseUser = await authService.registerNewUser(userId, req.body);

    const apiReturnPayload: ApiReturnPayload = {
      success: true,
      data: responseUser,
    };

    res.send(apiReturnPayload);
  } catch (error: any) {
    const apiReturnPayload: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    res.send(apiReturnPayload);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const responseUser = await authService.loginUser({ email, password });

    if (responseUser === "USER_PASSWORD_WRONG") {
      res.status(401).send("USER_PASSWORD_WRONG");
      return;
    }

    const apiReturnPayload: ApiReturnPayload = {
      success: true,
      data: responseUser,
    };

    res.send(apiReturnPayload);
  } catch (error: any) {
    const apiReturnPayload: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    res.send(apiReturnPayload);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { userId, newPassword } = req.body;

    const responseUser = await authService.changePassword(userId, newPassword);

    const apiReturnPayload: ApiReturnPayload = {
      success: true,
      data: responseUser,
    };

    res.send(apiReturnPayload);
  } catch (error: any) {
    const apiReturnPayload: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    res.send(apiReturnPayload);
  }
};

export const renewToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const responseUser = await authService.renewToken(refreshToken);

    const apiReturnPayload: ApiReturnPayload = {
      success: true,
      data: responseUser,
    };

    res.send(apiReturnPayload);
  } catch (error: any) {
    const apiReturnPayload: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    res.send(apiReturnPayload);
  }
};
