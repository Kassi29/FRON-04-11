export class almacen{
    id!: number;
    name!: string;
    ubicacion!: string;
    departamento!:string;
    latitud!: number;
    longitud!: number;
  empresa!: Empresa;

}
export class Empresa {
  id!: number;
  name!: string;
  location!: string;
}
