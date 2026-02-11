import { IAuth } from "./auth.interface";
import { ITipoUsuario } from "./tipo_usuario.interface";
import { IFilial } from "./filial.interface";

export interface IUser extends IAuth {
  id?: number;
  name: string;
  isDisabled: boolean;
  createdByUserId?: number;
  tipoUsuarioId: number;
  filialId?: number | null;
  tipoUsuario?: ITipoUsuario;
  filial?: IFilial;
}
