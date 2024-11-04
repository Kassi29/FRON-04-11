import { Injectable } from '@angular/core';
import { producto } from "../../productos/model/producto";
import { HttpClient } from "@angular/common/http";
import { Carrito } from "../model/carrito";
import { catchError, tap } from "rxjs/operators";
import {throwError, BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private productosCarrito: { producto: producto; cantidad: number }[] = [];
  private totalCost: number | null = null;

  // BehaviorSubject para emitir cambios en el carrito
  private productsSubject = new BehaviorSubject<{ producto: producto; cantidad: number }[]>(this.productosCarrito);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8080/carrito';

  obtenerCarritosPorEmail(deliveryEmail: string): Observable<Carrito[]> {
    return this.http.get<Carrito[]>(`${this.apiUrl}/email/${deliveryEmail}`);
  }

  actualizarEstadoCarrito(idCarrito: number, nuevoEstado: string): Observable<Carrito> {
    console.log(`Enviando solicitud PATCH para el carrito con ID: ${idCarrito}, nuevo estado: ${nuevoEstado}`);
    return this.http.put<Carrito>(`${this.apiUrl}/${idCarrito}`, nuevoEstado).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);
      }),
      catchError(err => {
        console.error('Error en la solicitud PATCH:', err);
        return throwError(err);
      })
    );
  }

  enviarCarrito(carrito: Carrito) {
    console.log('Enviando carrito al backend:', carrito);
    return this.http.post<Carrito>(this.apiUrl, carrito).pipe(
      tap(response => {
        console.log('Respuesta del backend:', response);
      }),
      catchError(error => {
        console.error('Error al enviar el carrito:', error);
        return throwError(error);
      })
    );
  }

  addToCart(producto: producto, cantidad: number): void {
    console.log('Producto a agregar:', producto);
    const existingProduct = this.productosCarrito.find(p => p.producto.id === producto.id);

    if (existingProduct) {
      const newQuantity = existingProduct.cantidad + cantidad;

      if (newQuantity > producto.stock) {
        alert(`No se puede agregar más cantidad que el stock disponible. Quedan ${producto.stock - existingProduct.cantidad} en stock.`);
        return;
      }

      existingProduct.cantidad = newQuantity; // Actualiza la cantidad
    } else {
      if (cantidad > producto.stock) {
        alert(`No se puede agregar más cantidad que el stock disponible (stock máximo = ${producto.stock}).`);
        return;
      }

      this.productosCarrito.push({ producto: { ...producto }, cantidad });
    }

    console.log('Estado del carrito después de agregar:', this.productosCarrito);
    this.productsSubject.next([...this.productosCarrito]); // Emite el nuevo estado del carrito
    this.setTotalCost(this.calculateTotalCost());
  }

  getCartProducts() {
    return [...this.productosCarrito]; // Devuelve una copia del carrito
  }

  deleteProduct(producto: producto): void {
    const index = this.productosCarrito.findIndex(p => p.producto.id === producto.id);
    if (index !== -1) {
      this.productosCarrito.splice(index, 1); // Elimina el producto
      console.log(`Producto eliminado: ${producto.name}`);
      this.productsSubject.next([...this.productosCarrito]); // Emite el nuevo estado del carrito
    }
  }

  setTotalCost(total: number): void {
    this.totalCost = total;
  }

  getTotalCost(): number | null {
    return this.totalCost;
  }

  clearCart() {
    this.productosCarrito = []; // Limpia el carrito
    this.productsSubject.next([...this.productosCarrito]); // Emite el nuevo estado del carrito
    console.log('Carrito limpiado.');
  }
  calculateTotalCost(): number {
    return this.productosCarrito.reduce((total, item) => total + (item.producto.price * item.cantidad), 0);
  }

  obtenerCarritosPorUsuario(idUsuario: number): Observable<Carrito[]> {
    const url = `${this.apiUrl}/${idUsuario}`; // Construir la URL
    return this.http.get<Carrito[]>(url).pipe(
      tap(carritos => {
        console.log('Carritos obtenidos:', carritos);
      }),
      catchError(error => {
        console.error('Error al obtener carritos:', error);
        return throwError(error);
      })
    );
  }

}
