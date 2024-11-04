import { Component, OnInit } from '@angular/core';
import { producto } from "../productos/model/producto";
import { CarritoService } from "./service/carrito.service";
import { AuthService } from "../realAuth/service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productocarrito: { producto: producto; cantidad: number; }[] = [];
  totalCost: number | null = null; // Inicializa totalCost
  totalProducts: number = 0; // Nueva variable para contar productos

  constructor(private cartService: CarritoService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('Cargando productos en el carrito...');

    // Suscribirse a los cambios en el carrito
    this.cartService.products$.subscribe(products => {
      this.productocarrito = products;
      this.calculateTotal(); // Calcular el total al iniciar
      this.calculateTotalProducts(); // Calcular el total de productos al iniciar
    });
  }

  updateQuantity(producto: { producto: producto; cantidad: number }, nuevaCantidad: number): void {
    const cantidad = Math.max(1, Math.min(Number(nuevaCantidad), producto.producto.stock)); // Asegúrate de que esté dentro del rango
    console.log(`UPDATE SE EJECUTA Intentando actualizar la cantidad: ${cantidad} para el producto: ${producto.producto.name}`);

    if (cantidad === producto.cantidad) {
      console.log('La cantidad no ha cambiado, no se necesita actualizar.');
      return; // Si la cantidad no ha cambiado, no hacer nada
    }

    producto.cantidad = cantidad;


   // this.cartService.addToCart(producto.producto, producto.cantidad); // Actualiza la cantidad en el servicio
    this.calculateTotal(); // Calcular el total después de actualizar la cantidad
    this.calculateTotalProducts(); // Actualizar el total de productos

    console.log(`Total calculado: ${this.totalCost}, Total de productos: ${this.totalProducts}`);
    this.cartService.setTotalCost(this.cartService.calculateTotalCost());
  }



  deleteProduct(producto: producto): void {
    this.cartService.deleteProduct(producto); // Elimina el producto en el servicio
  }

  calculateTotal(): void {
    this.totalCost = this.productocarrito.reduce((total, producto) => {
      return total + (producto.producto.price * producto.cantidad);
    }, 0);
  }

  calculateTotalProducts(): void {
    this.totalProducts = this.productocarrito.reduce((total, producto) => {
      return total + producto.cantidad; // Sumar las cantidades de cada producto
    }, 0);
  }

  onCheckout() {
    this.authService.isAuthenticated().subscribe(isAuth => {
      console.log('Usuario autenticado:', isAuth); // Agrega este log
      if (isAuth) {
        this.router.navigate(['/web2/pago']);
      } else {
        this.router.navigate(['web/login']);
      }
    });
  }

}
