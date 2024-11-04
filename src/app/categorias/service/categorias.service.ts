import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { categoria } from 'src/app/categorias/model/categoria';



@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  private urlCategory: string = 'http://localhost:8080/categories';


  constructor(private http: HttpClient, private router: Router) { }


  //C A T E G O R I A

  findAllCat(): Observable<categoria[]> {
    return this.http.get<categoria[]>(this.urlCategory);
  }

  createCat(categoria: categoria): Observable<categoria>{
    return this.http.post<categoria>(this.urlCategory, categoria);
  }

  updateCat(categoria: categoria): Observable<categoria> {
    return this.http.put<categoria>(`${this.urlCategory}/${categoria.id}`, categoria);
  }

  deleteCat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlCategory}/${id}`);
  }



}
