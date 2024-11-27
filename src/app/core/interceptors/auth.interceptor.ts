import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersistenceService } from '../services/persistence.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private persistenceService: PersistenceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.persistenceService.getFromLocalStorage('authToken');  // Obtener el token del localStorage
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Agregar el token al encabezado de autorización
        }
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}
