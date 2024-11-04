import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/carrito/service/carrito.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  totalProducts: number = 0; // Variable para almacenar el total de productos

  constructor(private cartService: CarritoService) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en el carrito
    this.cartService.products$.subscribe(() => {
      this.updateTotalProducts(); // Actualizar el total de productos cada vez que cambie el carrito
    });

    // Inicializar el total al cargar
    this.updateTotalProducts();
  }

  updateTotalProducts(): void {
    const products = this.cartService.getCartProducts();
    this.totalProducts = products.reduce((total, producto) => total + producto.cantidad, 0);
  }
}

