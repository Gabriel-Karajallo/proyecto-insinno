import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AbstractWebService } from '../services/abstract-web.service';
import { PersistenceService } from '../services/persistence.service';
import { DataManagementService } from '../services/data-management.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private AbstractWebService: AbstractWebService,
    private persistenceService: PersistenceService,
    private DataManagementService: DataManagementService) { }

  //autenticación
  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.AbstractWebService.post('/auth/login', body).pipe(
      catchError((error) => {
        console.error('Error de autenticación', error);
        throw error;
      })
    )
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.DataManagementService.getToken() !== null;
  }
  // registrar un nuevo usuario
  register(username: string, password: string): Observable<any> {
    const payload = {
      username,
      password,
    };

    return this.AbstractWebService.postRegister('/api/users/register',  payload ); // Realiza una llamada POST al backend.
  }

  logout(): void {
    console.log('Eliminando token del localStorage');
    this.persistenceService.removeFromLocalStorage('token');  // Elimina el token
    this.persistenceService.removeFromLocalStorage('refreshToken'); // Si tienes refresh token
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  // Eliminar cuenta del usuario
deleteAccount(userId: string): Observable<any> {
  return this.AbstractWebService.delete(`/api/users/delete/${userId}`).pipe(
    catchError((error) => {
      console.error('Error al eliminar la cuenta:', error);
      throw error;
    })
  );
}
}
