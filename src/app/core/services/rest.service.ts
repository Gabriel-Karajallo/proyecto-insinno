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
}
