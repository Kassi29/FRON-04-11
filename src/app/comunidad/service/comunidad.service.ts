import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { comunidad } from '../model/comunidad';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  private urlCommunity: string = 'http://localhost:8080/communities';

  constructor(private http: HttpClient, private router: Router) { }

    // C O M U N I D A D 

    findAllCom(): Observable<comunidad[]> {
      return this.http.get<comunidad[]>(this.urlCommunity);
    }
  
    createCom(comunidad: comunidad): Observable<comunidad>{
      return this.http.post<comunidad>(this.urlCommunity, comunidad);
    }
  
    updateCom(comunidad: comunidad): Observable<comunidad> {
      return this.http.put<comunidad>(`${this.urlCommunity}/${comunidad.id}`, comunidad);
    }
  
    deleteCom(id: number): Observable<void> {
      return this.http.delete<void>(`${this.urlCommunity}/${id}`);
    }
  

}
