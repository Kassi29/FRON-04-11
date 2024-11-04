import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {sellerDTO} from "../model/SellerDto";


@Injectable({
  providedIn: 'root'
})
export class artesanoService {
    private apiUrl = 'http://localhost:8080/users/listaArtesanos';

  constructor(private http: HttpClient) { }


  getArtesano(): Observable<sellerDTO[]> {
    return this.http.get<sellerDTO[]>(this.apiUrl);
  }
  deleteArtesano(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Ajusta la ruta según tu configuración
  }

  update(sellerRoleId: number, updatedArtesano: sellerDTO): Observable<sellerDTO> {
    return this.http.put<sellerDTO>(`${this.apiUrl}/${sellerRoleId}`, updatedArtesano);
  }



}
