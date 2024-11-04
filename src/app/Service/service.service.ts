import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { usuario } from '../links/register/model/usuario';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url: string = 'http://localhost:8080/users';


  // Login
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private roles: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }


  findAll(): Observable<usuario[]> {
    return this.http.get<usuario[]>(this.url);
  }

  create(usuario: usuario): Observable<usuario> {
    return this.http.post<usuario>(`${this.url}/register`, usuario);
  }

  createDelivery(usuario: usuario, empresaId: number): Observable<usuario> {
    return this.http.post<usuario>(`${this.url}/registerDelivery?empresaId=${empresaId}`, usuario);
  }

  createAdmin(usuario: usuario):Observable<usuario> {
    return this.http.post<usuario>(this.url, usuario);
  }

  createArtesano(usuario: usuario, comunidadId: number): Observable<usuario>{
    return this.http.post<usuario>(`${this.url}/registerArtesano?comunidadId=${comunidadId}`, usuario);
  }

  changePassword(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}/change-password`, data, { headers });
  }



  update(usuario: usuario): Observable<usuario> {
    return this.http.put<usuario>(`${this.url}/${usuario.id}`, usuario);
  }

  // Eliminar
  delete(usuario: usuario): Observable<void> {
    return this.http.delete<void>(`${this.url}/eliminar/${usuario.id}`);
  }

  //LISTAR USUARIO X ROLE
  getUsersByRole(role: string): Observable<usuario[]> {
    return this.http.get<usuario[]>(`${this.url}/filterByRole/${role}`);
  }

  //lista delivery x empresa
  getUsersByEmpresa(empresaId: number): Observable<usuario[]> {
    return this.http.get<usuario[]>(`${this.url}/${empresaId}/users`);
  }

}
