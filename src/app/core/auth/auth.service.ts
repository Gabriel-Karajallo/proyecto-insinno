import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AbstractWebService } from '../services/abstract-web.service';
import { PersistenceService } from '../services/persistence.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private AbstractWebService: AbstractWebService,
    private persistenceService: PersistenceService){}

  //autenticación
  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.AbstractWebService.post('/auth/login', body ).pipe(
      catchError((error) => {
        console.error('Error de autenticación', error);
        throw error;
      })
    )
  }

  // registrar un nuevo usuario
  register(username: string, password: string): Observable<any> {
    const payload = {
      username,
      password,
    };

    return this.AbstractWebService.post('/register', { payload }); // Realiza una llamada POST al backend.
  }

  logout(): void {
    console.log('Eliminando token del localStorage');
    this.persistenceService.removeFromLocalStorage('token');  // Elimina el token
    this.persistenceService.removeFromLocalStorage('refreshToken'); // Si tienes refresh token
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
