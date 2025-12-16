import { IAuth } from "./auth.interface";

export interface IUser extends IAuth {
  id?: number;
  name: string;
  isDisabled: boolean;
  createdByUserId?: number;
  tipoUsuarioId: number;
  filialId?: number | null;
}
