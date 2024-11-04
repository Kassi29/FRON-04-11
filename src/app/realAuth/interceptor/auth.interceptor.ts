import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Lista de URLs exentas
    const exemptedUrls = [
      'http://localhost:8080/users/register',
      'http://localhost:8080/products',
      'http://localhost:8080/categories',
      'http://localhost:8080/users/filterByRole/ROLE_SELLER'
    ];

    // Verifica si la URL está en la lista de excepciones
    if (exemptedUrls.includes(req.url)) {
      console.log(`Permitiendo acceso a la ruta sin token: ${req.url}`);
      return next.handle(req);
    }

    // Si no está exenta, verifica el token
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    } else {
      console.error(`Acceso denegado, falta el token para: ${req.url}`);
      // Manejar la falta de token si es necesario
      return next.handle(req); // O manejarlo de otra manera
    }
  }
}
