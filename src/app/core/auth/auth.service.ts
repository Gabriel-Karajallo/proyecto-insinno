import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environments } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Url = environments.baseUrl;
  private readonly TOKEN_KEY = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router) {}

  //autenticación
  login(username: string, password: string): Observable<any> {
    const body = {
      username,
      password
    };

    //TODO: CORREGIR EL ENVÍO AL BACKEND
    return this.http.post<any>(this.Url, body).pipe(
      catchError((error) => {
        console.error('Error de autenticación', error);
        throw error;
      })
    )
  }

  //obtener el token desde el almacenamiento
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);// Elimina el token del localStorage
  }
  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Método para registrar un nuevo usuario
  register(username: string, password: string, rememberMe: boolean): Observable<any> {
    const payload = {
      username,
      password,
      rememberMe
    };

    return this.http.post(`${this.Url}/register`, payload); // Realiza una llamada POST al backend.
  }



}
