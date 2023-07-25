import { User } from '.';

export interface Rol {
    rolId: number;
    name: string;
    description: string;
    users: User[];
}
