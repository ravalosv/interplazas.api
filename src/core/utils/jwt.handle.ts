import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async (id: string, email: string, role: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const jwt = sign({ id, email, role }, JWT_SECRET, {
    expiresIn: "60d",
  });

  return jwt;
};

const generateRefreshToken = async (id: string, email: string, role: string) => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const jwt = sign({ id, email, role }, JWT_SECRET, {
    expiresIn: "2d",
  });

  return jwt;
};

const verifyToken = async (jwt: string) => {
  try {
    const isOk = verify(jwt, JWT_SECRET!);
    return {
      success: true,
      data: isOk,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error.message,
    };
  }
};

export { generateToken, verifyToken, generateRefreshToken };
