export class Carrito {
  id!: number;
  totalEnvio: number;
  idUser: number; // O string
  productos: { id_producto: number; cantidad: number }[];
  estado: string; // Nuevo
  departamento: string; // Nuevo
  latitud: number; // Nuevo
  longitud: number; // Nuevo
  deliveryEmail: string; // Nuevo
  horario: string; // Nuevo
  fechaEntrega: string; // Nuevo

  constructor(
    idUser: number,
    totalEnvio: number, // Asegúrate de que este parámetro se use
    productos: { id_producto: number; cantidad: number }[],
    estado: string = 'pendiente', // Valor por defecto
    departamento?: string,
    latitud?: number,
    longitud?: number,
    deliveryEmail?: string,
    horario?: string, // Nuevo
    fechaEntrega?: string // Nuevo
  ) {
    this.idUser = idUser;
    this.productos = productos;
    this.estado = estado;
    this.departamento = departamento || '';
    this.latitud = latitud || 0;
    this.longitud = longitud || 0;
    this.deliveryEmail = deliveryEmail || '';
    this.horario = horario || ''; // Nuevo
    this.fechaEntrega = fechaEntrega || ''; // Nuevo
    this.totalEnvio = totalEnvio; // Asigna el valor recibido
  }
}
