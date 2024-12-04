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

    // Mock para el endpoint de entradas de concierto
    if (req.url.endsWith('/dashboard/products') && req.method === 'GET') {
      return of(new HttpResponse({
        status: 200,
        body: [
          {
            id: 1,
            title: 'Concierto de Coldplay',
            description: 'Descripción.',
            imageUrl: 'https://wallpapers.com/images/hd/coldplay-viva-la-vida-tour-qu2jse22njp9di6q.jpg'
          },
          {
            id: 2,
            title: 'Festival Electrónico',
            description: 'Descripción.',
            imageUrl: 'https://allmusicspain.com/wp-content/uploads/2018/05/Skrillex-18.jpg'
          },
          {
            id: 3,
            title: 'Concierto de Jazz',
            description: 'Descripción.',
            imageUrl: 'https://swissxplorer.com/wp-content/uploads/2024/08/jazz-Festival-in-switzerland.jpg'
          },
          {
            id: 1,
            title: 'Concierto de Coldplay',
            description: 'Descripción.',
            imageUrl: 'https://wallpapers.com/images/hd/coldplay-viva-la-vida-tour-qu2jse22njp9di6q.jpg'
          },
          {
            id: 2,
            title: 'Festival Electrónico',
            description: 'Descripción.',
            imageUrl: 'https://allmusicspain.com/wp-content/uploads/2018/05/Skrillex-18.jpg'
          },
          {
            id: 3,
            title: 'Concierto de Jazz',
            description: 'Descripción.',
            imageUrl: 'https://swissxplorer.com/wp-content/uploads/2024/08/jazz-Festival-in-switzerland.jpg'
          },
          {
            id: 1,
            title: 'Concierto de Coldplay',
            description: 'Descripción.',
            imageUrl: 'https://wallpapers.com/images/hd/coldplay-viva-la-vida-tour-qu2jse22njp9di6q.jpg'
          },
          {
            id: 2,
            title: 'Festival Electrónico',
            description: 'Descripción.',
            imageUrl: 'https://allmusicspain.com/wp-content/uploads/2018/05/Skrillex-18.jpg'
          },
          {
            id: 3,
            title: 'Concierto de Jazz',
            description: 'Descripción.',
            imageUrl: 'https://swissxplorer.com/wp-content/uploads/2024/08/jazz-Festival-in-switzerland.jpg'
          }
        ]
      }));
    }
    return next.handle(req);
  }
}

