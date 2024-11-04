
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {almacen} from "../model/almacen";



@Injectable({
  providedIn: 'root'
})
export class AlmacenService {


  private url: string = 'http://localhost:8080/almacen';


  constructor(private http: HttpClient, private router: Router) { }


  //ALMACEN

  findAllAlmacen(): Observable<almacen[]> {
    return this.http.get<almacen[]>(this.url);
  }

  createAlmacen(almacen: almacen): Observable<almacen>{
    return this.http.post<almacen>(this.url, almacen);
  }

  updateAlmacen(almacen: almacen): Observable<almacen> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<almacen>(`${this.url}/${almacen.id}`, JSON.stringify(almacen), { headers });
  }

  deleteAlmacen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }



}
