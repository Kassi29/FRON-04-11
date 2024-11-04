import { categoria } from "../../categorias/model/categoria";
import { almacen } from "../../almacen/model/almacen"; // Asegúrate de importar el modelo de almacen

export class producto {
  id!: number;
  name!: string;
  description!: string; // Cambiado a 'description' para que coincida con el backend
  categories: categoria[] = []; // Mantiene un arreglo de categorías
  stock!: number;
  price!: number; // Cambiado a 'price' para que coincida con el backend
  imageUrl!: string; // Se deja comentado ya que no lo necesitas por ahora
  //seller!: { id: number, name: string, lastname: string, email: string };
  sellerEmail!: string;
  almacen!: almacen; // Agregado para incluir el almacén
}


