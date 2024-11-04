import { comunidad } from "../../comunidad/model/comunidad";

export class sellerDTO {
  sellerRoleId: number; // ID del rol de artesano
  user: {
    id: number;
    name: string;
    lastname?: string;
    email?: string;
  };
  comunidad: comunidad; // Añadir este campo

  constructor(sellerRoleId: number, user: any, comunidad: comunidad) {
    this.sellerRoleId = sellerRoleId;
    this.user = user;
    this.comunidad = comunidad;
  }
}
