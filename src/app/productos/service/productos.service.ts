import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { producto } from '../model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlProducto: string = 'http://localhost:8080/products';
  constructor(private http: HttpClient, private router: Router) { }

  // P R O D U C T O

  //para todos los prod
  findAllPro(): Observable<producto[]> {
    return this.http.get<producto[]>(this.urlProducto);
  }


  findProductsBySeller(sellerId: number): Observable<producto[]> {
    return this.http.get<producto[]>(`${this.urlProducto}/seller/${sellerId}`);
  }


  createPro(formData: FormData): Observable<producto> {
    return this.http.post<producto>(this.urlProducto, formData);
  }

  // Método para actualizar un producto
  updatePro(producto: producto, id: number, imagenFile: File | null): Observable<producto> {
    const formData = new FormData();
    formData.append('productModel', new Blob([JSON.stringify(producto)], { type: 'application/json' }));
    if (imagenFile) {
      formData.append('file', imagenFile);
    }
    return this.http.put<producto>(`${this.urlProducto}/${id}`, formData);
  }



  deletePro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlProducto}/${id}`);
  }

  findProductoById(id: number): Observable<producto> {
    return this.http.get<producto>(`${this.urlProducto}/${id}`);
}

}
