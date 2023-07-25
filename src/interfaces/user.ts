import { Rol } from "./rol";

export interface User {
    id?: number;
    name: string;
    email: string;
    username: string;
    password?: string;
    address?: string;
    phone?: string;
    isActive: boolean;
    rolId: number;
    rol: Rol;
}
