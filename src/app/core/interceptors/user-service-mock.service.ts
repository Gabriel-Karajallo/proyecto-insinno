import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environments } from '../../environment/environment';
import { ProfileComponent } from '../../pages/profile/profile.component';


@Injectable({
  providedIn: 'root'
})
export class UserServiceMockService implements HttpInterceptor {




  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (environments.isMock) {
      // Simula la respuesta al iniciar sesión
      if (req.url.endsWith('auth/login') && req.method === 'POST') {
        return of(new HttpResponse({
          status: 200,
          body: {
            jwt: 'token123456', // Token simulado
            id: 1,
            name: 'John',
            email: 'johndoe@example.com',
            password: '123456A',
          }
        }));
      }

      // Simula una solicitud protegida con token (ejemplo: GET /users/1)
      if (req.url.endsWith('api/users/') && req.method === 'GET') {

        // Si el token es correcto, devuelve los datos simulados
        return of(new HttpResponse({
          status: 200,
          body: {
            id: 1,
            name: 'John',
            email: 'johndoe@example.com',
            password: '123456A',
          }
        }));
      }
      if (req.url.endsWith('/users/delete') && req.method === 'DELETE') {
        return of(new HttpResponse({
          status: 200,
          body: { message: 'Mock: Usuario eliminado correctamente' }
        }));
      }
    }
    return next.handle(req);

  }
}
