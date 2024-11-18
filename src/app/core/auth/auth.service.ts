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
    const body = {
      username,
      password
    };
    return this.AbstractWebService.post('/login', { body }).pipe(
      catchError((error) => {
        console.error('Error de autenticación', error);
        throw error;
      })
    )
  }

  //guardar el token en el almacenamiento
  saveToken( token: string ): void{
    this.persistenceService.saveToLocalStorage('token', token)
  }

  //obtener el token
  getToken(): string | null {
    return this.persistenceService.getFromLocalStorage('token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // registrar un nuevo usuario
  register(username: string, password: string): Observable<any> {
    const payload = {
      username,
      password,
    };

    return this.AbstractWebService.post('/register', { payload }); // Realiza una llamada POST al backend.
  }
}
