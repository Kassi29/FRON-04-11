import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlEmpresa: string = 'http://localhost:8080/empresas';
  constructor(private http: HttpClient, private router: Router) { }

  //E M P R E S A

  findAllEmp(): Observable<empresa[]> {
    return this.http.get<empresa[]>(this.urlEmpresa);
  }

  createEmp(empresa: empresa): Observable<empresa>{
    return this.http.post<empresa>(this.urlEmpresa,empresa);
  }

  updateEmp(empresa: empresa): Observable<empresa> {
    return this.http.put<empresa>(`${this.urlEmpresa}/${empresa.id}`, empresa);
  }

  deleteEmp(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlEmpresa}/${id}`);
  }
  findEmpresasByLocation(location: string): Observable<empresa[]> {
    return this.http.get<empresa[]>(`${this.urlEmpresa}/by-location/${location}`);
  }


}
