import { IAuth } from "./auth.interface";

export interface IUser extends IAuth {
  id?: number;
  name: string;
  role: "admin" | "filial";
  isDisabled: boolean;
  createdByUserId?: number;
  grupoId?: number | null;
  tipoUsuarioId: number;
  filialId?: number | null;
}
