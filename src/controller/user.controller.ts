import { Request, Response } from "express";
import { ApiReturnPayload } from "../data/payloads/api-return.payload";
import * as usersService from "../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query.filter as string;

    let users: any[];
    if (!query) {
      users = await usersService.getUsers();
    } else if (query === "active") {
      users = await usersService.getUsers({ filter: "active" });
    } else if (query === "inactive") {
      users = await usersService.getUsers({ filter: "inactive" });
    } else {
      throw new Error("INVALID_QUERY");
    }

    const apiReturnPayload: ApiReturnPayload = {
      success: true,
      data: users,
    };
    return res.send(apiReturnPayload);
  } catch (error: any) {
    const apiReturnPayload: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    res.send(apiReturnPayload);
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const users = await usersService.getUserById(id);

    const apiReturnPayload: ApiReturnPayload = {
      success: true,
      data: users,
    };
    return res.send(apiReturnPayload);
  } catch (error: any) {
    const apiReturnPayload: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    res.send(apiReturnPayload);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email, tipoUsuarioId, filialId } = req.body;

    const users = await usersService.updateUser(userId, { name, email, tipoUsuarioId, filialId });

    const apiReturnPayload: ApiReturnPayload = {
      success: true,
      data: users,
    };
    return res.send(apiReturnPayload);
  } catch (error: any) {
    const apiReturnPayload: ApiReturnPayload = {
      success: false,
      error: error.message || "INTERNAL_SERVER_ERROR",
    };
    res.send(apiReturnPayload);
  }
};

export const disableUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const responseUser = await usersService.disableUser(userId);

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

export const activateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const responseUser = await usersService.activateUser(userId);

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
