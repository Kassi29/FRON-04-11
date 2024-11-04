import { Component } from '@angular/core';
import {Carrito} from "../../carrito/model/carrito";
import {CarritoService} from "../../carrito/service/carrito.service";
import {AuthService} from "../../realAuth/service/auth.service";

@Component({
  selector: 'app-listd-pedidos',
  templateUrl: './listd-pedidos.component.html',
  styleUrls: ['./listd-pedidos.component.css']
})
export class ListdPedidosComponent {

  carritos: Carrito[] = [];
  deliveryEmail: string | null = null; // Cambia el tipo a string | null para manejar la ausencia de email

  constructor(private carritoService: CarritoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.obtenerEmailDesdeLocalStorage();
    if (this.deliveryEmail) {
      this.cargarCarritosPorEmail(this.deliveryEmail);
    } else {
      console.error('No se encontró un email en localStorage.');
    }
  }

  obtenerEmailDesdeLocalStorage(): void {
    const currentUser = this.authService.getCurrentUser();
    console.log('Usuario actual:', currentUser);
    this.deliveryEmail = currentUser ? currentUser.email : null; // Asigna el email si existe
  }


  cargarCarritosPorEmail(email: string): void {
    this.carritoService.obtenerCarritosPorEmail(email).subscribe({
      next: (carritos) => {
        this.carritos = carritos;
        console.log('Carritos obtenidos:', this.carritos);
      },
      error: (err) => {
        console.error('Error al obtener carritos:', err);
      }
    });
  }





  cambiarEstadoRecogiendoAlmacen(carrito: Carrito) {
    const nuevoEstado = 'Recogiendo Almacen';
    this.carritoService.actualizarEstadoCarrito(carrito.id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado:', response);
        carrito.estado = nuevoEstado; // Actualiza el estado local
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
      }
    });
  }

  cambiarEstadoEnCamino(carrito: Carrito) {
    const nuevoEstado = 'En Camino';
    this.carritoService.actualizarEstadoCarrito(carrito.id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado:', response);
        carrito.estado = nuevoEstado; // Actualiza el estado local
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
      }
    });
  }

  cambiarEstadoEnPuerta(carrito: Carrito) {
    const nuevoEstado = 'En Puerta';
    this.carritoService.actualizarEstadoCarrito(carrito.id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado:', response);
        carrito.estado = nuevoEstado; // Actualiza el estado local
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
      }
    });
  }

  cambiarEstadoNoEntregado(carrito: Carrito) {
    const nuevoEstado = 'No Entregado';
    this.carritoService.actualizarEstadoCarrito(carrito.id, nuevoEstado).subscribe({
      next: (response) => {
        console.log('Estado actualizado:', response);
        carrito.estado = nuevoEstado; // Actualiza el estado local
      },
      error: (err) => {
        console.error('Error al actualizar el estado:', err);
      }
    });
  }
}
