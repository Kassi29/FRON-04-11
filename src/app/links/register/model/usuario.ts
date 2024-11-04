import {Role} from "./rol";

export class usuario{
    id!: number;
    name!: string;
    lastname!: string;
    email!: string;
    password!: string;
    enabled!: boolean;
    admin!: boolean;
    roles!: Role[];
}