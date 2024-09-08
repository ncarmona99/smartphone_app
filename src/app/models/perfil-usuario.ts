import { Rol } from "./rol";
import { User } from "./user";

export interface PerfilUsuario{
    user: User;
    rol: Rol;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
}