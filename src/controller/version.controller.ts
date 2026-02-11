import { Request, Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";

export const getVersion = (req: Request, res: Response) => {
  try {
    const packageJsonPath = join(__dirname, "../../package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    res.json({ success: true, version: packageJson.version });
  } catch (error) {
    res.status(500).json({ success: false, error: "Could not read version" });
  }
};
