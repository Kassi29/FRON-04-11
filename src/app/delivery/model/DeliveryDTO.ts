export interface DeliveryDTO {
  deliveryRoleId: number; // ID del rol de delivery
  user: {
    id: number; // ID del usuario
    name: string; // Nombre del usuario
    lastname?: string; // Apellido del usuario (opcional)
    email?: string; // Correo del usuario (opcional)
  };
  empresa: {
    id: number; // ID de la empresa
    name: string; // Nombre de la empresa
  };
}
