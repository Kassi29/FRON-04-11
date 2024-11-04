import { Component } from '@angular/core';
import {CarritoService} from "../../carrito/service/carrito.service";
import { Carrito } from "src/app/carrito/model/carrito";
import {AuthService} from "../../realAuth/service/auth.service";


@Component({
  selector: 'app-listc-pedidos',
  templateUrl: './listc-pedidos.component.html',
  styleUrls: ['./listc-pedidos.component.css']
})
export class ListcPedidosComponent {

  carritos: Carrito[] = [];
  buttonEnabledCache: { [key: number]: boolean } = {};


  constructor(private cartService: CarritoService,private authService: AuthService) {


  }
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    console.log('Usuario actual:', currentUser); // Log para verificar el usuario

    // Verifica si currentUser existe y obtiene el ID
    if (currentUser) {
      const idUsuario = currentUser.id; // Asegúrate de que el ID está en la propiedad correcta
      this.cartService.obtenerCarritosPorUsuario(idUsuario).subscribe({
        next: (carritos) => {
          this.carritos = carritos;
        },
        error: (err) => {
          console.error('Error al cargar carritos:', err);
        }
      });
    } else {
      console.error('No se pudo obtener el usuario actual.');
    }
  }



  cambiarEstadoEnProceso(id: number): void {
    // Lógica para cambiar el estado del carrito a 'en proceso'

  }


  isButtonEnabled(carrito: any): boolean {
    if (this.buttonEnabledCache[carrito.id] !== undefined) {
      return this.buttonEnabledCache[carrito.id]; // Devuelve el valor almacenado si ya se calculó
    }

    if (!carrito.fechaEntrega) {
      console.log("No hay fecha de entrega. Botón deshabilitado.");
      this.buttonEnabledCache[carrito.id] = false; // Almacena el resultado
      return false;
    }

    const currentDate = new Date();
    const [startHour, startMinute] = [10, 0];
    const [endHour, endMinute] = [12, 30];

    // Verifica el formato de la fecha
    const fechaParts = carrito.fechaEntrega.split('-');
    if (fechaParts.length !== 3) {
      console.error("Formato de fecha incorrecto:", carrito.fechaEntrega);
      this.buttonEnabledCache[carrito.id] = false; // Almacena el resultado
      return false;
    }

    const [deliveryYear, deliveryMonth, deliveryDate] = fechaParts.map(Number);
    const deliveryDateObj = new Date(deliveryYear, deliveryMonth - 1, deliveryDate); // Mes -1 para JavaScript

    const isInProcess = carrito.estado === 'En Puerta';
    const isSameDay = currentDate.toDateString() === deliveryDateObj.toDateString();

    const buttonEnabled = isInProcess && isSameDay;
    console.log(`Botón habilitado: ${buttonEnabled}`);
    this.buttonEnabledCache[carrito.id] = buttonEnabled; // Almacena el resultado

    return buttonEnabled;
  }


  cambiarEstadoPedidoRecibido(idCarrito: number): void {
    const nuevoEstado = 'Entregado'; // Define el nuevo estado
    console.log(`Cambiando estado del carrito ${idCarrito} a: ${nuevoEstado}`);

    this.cartService.actualizarEstadoCarrito(idCarrito, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado:', response);
        // Aquí puedes hacer algo más, como actualizar la lista de carritos
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
      }
    });
  }



}
