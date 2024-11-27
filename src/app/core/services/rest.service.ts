import { Injectable } from '@angular/core';
import { AbstractWebService } from './abstract-web.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { endPoints, environments } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService extends AbstractWebService {

  url = environments.baseUrl + environments.apiPrefix;

  constructor(http: HttpClient) {
    super(http)
  }

  public getUser(userId: string): Observable<any> {
    return this.get(this.url + endPoints.users + userId).pipe(
      catchError((error) => {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
      })
    );
  }
}
