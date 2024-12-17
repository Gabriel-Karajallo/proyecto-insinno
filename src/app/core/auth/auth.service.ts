import { environments, endPoints } from './../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
    private DataManagementService: DataManagementService,
  ) { }

  //autenticación
  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    return this.AbstractWebService.post('/auth/login', body).pipe(
      tap((response: any) => {
        console.log('Token recibido:', response.jwt); // Verificar si llega
        if (response && response.jwt) {
          this.persistenceService.saveToLocalStorage(response.jwt);  // Guardar el token
        } else {
          console.error('El backend no devolvió un token');
        }
      }),
      catchError((error) => {
        console.error('Error de autenticación', error);
        throw error;
      })
    );
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.DataManagementService.getToken() !== null;
  }
  // registrar un nuevo usuario
  register(username: string, password: string, email: string): Observable<any> {
    const payload = {
      username,
      email,
      password,
    };

    return this.AbstractWebService.postRegister('/api/users/register', payload); // Realiza una llamada POST al backend.
  }

  logout(): void {
    console.log('Eliminando token del localStorage');
    this.persistenceService.removeFromLocalStorage();  // Elimina el token
    this.persistenceService.clearLocalStorage();
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  // Eliminar cuenta del usuario
  url = environments.baseUrl + environments.apiPrefix;
  deleteAccount(id: string): Observable<any> {
    const finalUrl = `${this.url + endPoints.users + endPoints.deleteUser}${id}`;
    console.log('URL generada para eliminar cuenta:', finalUrl);

    return this.AbstractWebService.delete(finalUrl, { responseType: 'text' }).pipe(
      tap(() => {
        console.log('Cuenta eliminada correctamente');
      }),
      catchError((error) => {
        console.error('Error al eliminar la cuenta:', error);
        throw error;
      })
    );
  }
}
