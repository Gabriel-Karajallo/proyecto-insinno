import { Injectable } from '@angular/core';
import { AbstractWebService } from './abstract-web.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { endPoints, environments } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService extends AbstractWebService {

  url = environments.baseUrl + environments.apiPrefix;

  constructor(http: HttpClient) {
    super(http)
    console.log('URL base generada en RestService:', this.url);
  }

  public getUser(id: string): Observable<any> {
    const finalUrl = this.url + endPoints.users + id;
    console.log('URL generada para getUser:', finalUrl);

    return this.get(finalUrl).pipe(
      tap(response => console.log('Respuesta de la API getUser:', response)),
      catchError((error) => {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
      })
    );
  }

  //actualizar username
  public updateUsername(username: string, value: string): Observable<any> {
    // URL base para actualizar
    const url = environments.baseUrl + environments.apiPrefix + endPoints.users + endPoints.updateUsername;
    return this.put(url, { username }).pipe(
      tap(response => console.log(`Respuesta de la API al actualizar ${username}:`, response)),
      catchError((error) => {
        console.error(`Error al actualizar ${username}:`, error);
        throw error;
      })
    );
  }

  //actualizar contraseña
  public updatePassword(password: string, value: string): Observable<any> {
    // URL base para actualizar
    const url = environments.baseUrl + environments.apiPrefix + endPoints.users + endPoints.updateUsername;
    return this.put(url, { password }).pipe(
      tap(response => console.log(`Respuesta de la API al actualizar ${password}:`, response)),
      catchError((error) => {
        console.error(`Error al actualizar ${password}:`, error);
        throw error;
      })
    );
  }

  //actualizar correo
  public updateEmail(email: string, value: string): Observable<any> {
    // URL base para actualizar
    const url = environments.baseUrl + environments.apiPrefix + endPoints.users + endPoints.updateUsername;
    return this.put(url, { email }).pipe(
      tap(response => console.log(`Respuesta de la API al actualizar ${email}:`, response)),
      catchError((error) => {
        console.error(`Error al actualizar ${email}:`, error);
        throw error;
      })
    );
  }


}

