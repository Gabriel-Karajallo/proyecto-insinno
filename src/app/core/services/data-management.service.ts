import { Injectable } from '@angular/core';
import { PersistenceService } from '../services/persistence.service';
import { HttpClient } from '@angular/common/http';
import { AbstractWebService } from './abstract-web.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private AbstractWebService: AbstractWebService,
  ) { }

  //guardar el token en el almacenamiento
  saveToken(token: string): void {
    this.persistenceService.saveToLocalStorage('token', token)
  }

  //obtener el token
  getToken(): string | null {
    return this.persistenceService.getFromLocalStorage('token');
  }

  //consultar datos de los usuarios registrados
  getUser(userId: string): Observable<any> {
    return this.AbstractWebService.get(`/api/users/${userId}`).pipe(
      catchError(error => {
          console.error('Error al obtener usuario', error);
          return throwError(() => new Error('Error al obtener usuario'));
      })
  );;
}
  //Para actualizar datos de los usuarios
  updateUser(userId: string, userData: any): Observable<any> {
      return this.AbstractWebService.put(`/api/users/${userId}`, userData);
  }
}
