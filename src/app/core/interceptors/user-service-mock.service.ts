import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environments } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class UserServiceMockService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!environments.isMock) {
      return next.handle(req);
    }

    // Simula la respuesta al iniciar sesión
    if (req.url.endsWith('auth/login') && req.method === 'POST') {
      return of(new HttpResponse({
        status: 200,
        body: {
          jwt: 'token123456', // Token simulado
          id: 1,
          username: 'John',
          email: 'johndoe@example.com',
          password: '123456A',
        }
      }));
    }
    return next.handle(req);
  }
}
