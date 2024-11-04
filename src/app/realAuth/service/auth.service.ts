import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Role } from "../../links/register/model/rol";
import { usuario } from "../../links/register/model/usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/login'; // Cambia esto si tu URL de login es diferente
  private tokenKey = 'authToken';
  private rolesKey = 'userRoles'; // Agregamos una clave para los roles
  private userKey = 'currentUser';
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log('Intentando iniciar sesión con:', email, password);
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
        tap(response => {
            console.log('Respuesta del servidor:', response);

            // Verifica si la respuesta contiene el token
            if (response.token) {
                localStorage.setItem(this.tokenKey, response.token);
            } else {
                console.warn('No se encontró el token en la respuesta del servidor.');
            }

            // Almacena el usuario en localStorage
            if (response.userId && response.email) {
                const user = { id: response.userId, email: response.email };
                localStorage.setItem(this.userKey, JSON.stringify(user));
                console.log('Usuario almacenado en localStorage:', user);
            } else {
                console.warn('No se encontró userId o email en la respuesta del servidor.');
            }

            // Llama a getUserByEmail para obtener los roles
            this.getUserByEmail(email).subscribe({
                next: userResponse => {
                    if (userResponse.roles) {
                        // Almacena roles como objetos
                        localStorage.setItem(this.rolesKey, JSON.stringify(userResponse.roles));
                    } else {
                        console.warn('No se encontraron roles en la respuesta del servidor.');
                    }
                },
                error: err => {
                    console.error('Error al obtener roles por email:', err);
                }
            });

            this.isAuthenticated$.next(true);
        }),
    );
}


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRoles(): Role[] | null {
    const roles = localStorage.getItem(this.rolesKey);
    return roles ? JSON.parse(roles) : null; // Asegúrate de que esto devuelva un array de Role
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey); // Elimina los roles al cerrar sesión
    localStorage.removeItem(this.userKey); // Elimina el usuario al cerrar sesión
    this.isAuthenticated$.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:8080/users/findByEmail/${email}`);
  }

  getCurrentUser(): usuario | null {
    console.log('Intentando obtener el usuario actual de localStorage...');

    const user = localStorage.getItem(this.userKey);

    if (user) {
      console.log('Usuario encontrado en localStorage:', user);
      try {
        const parsedUser = JSON.parse(user);
        console.log('Usuario parseado correctamente:', parsedUser);
        return parsedUser;
      } catch (error) {
        console.error('Error al parsear el usuario de localStorage:', error);
        return null; // Devolver null si ocurre un error
      }
    } else {
      console.log('No se encontró el usuario en localStorage.');
      return null;
    }
  }


}
