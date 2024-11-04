import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DeliveryDTO} from "../model/DeliveryDTO";
import {sellerDTO} from "../../artesanos/model/SellerDto";


@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'http://localhost:8080/users/listaDeliverys'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de deliverys
  getDeliverys(): Observable<DeliveryDTO[]> {
    return this.http.get<DeliveryDTO[]>(this.apiUrl);
  }
  deleteDelivery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); // Ajusta la ruta según tu configuración
  }

  update(deliveryRoleId : number, updatedDelivery: DeliveryDTO): Observable<DeliveryDTO>{
    return this.http.put<DeliveryDTO>(`${this.apiUrl}/${deliveryRoleId}`, updatedDelivery )
  }



}
