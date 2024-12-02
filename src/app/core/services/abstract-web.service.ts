import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environment/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbstractWebService {

  constructor(private http: HttpClient) { }

  // peticion POST login
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${environments.baseUrl}${url}`, body);
  }
  // peticion POST register
  postRegister<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${environments.baseUrl}${url}`, body);
  }

  // peticion GET
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  // PUT (actualizar)
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${environments.baseUrl}${url}`, body);
  }

  // DELETE (eliminar)
  // delete<T>(url: string): Observable<T> {
  //   return this.http.delete<T>(url);
  // }

  delete(url: string, options: any = {}): Observable<any> {
    return this.http.delete(url, { ...options, responseType: options.responseType || 'json' }) // <-- Agregar { observe: 'response' }
      .pipe(
        tap(response => {
          console.log('Respuesta completa:', response);
        }),
        catchError((error) => {
          console.error('Error en DELETE request:', error);
          return throwError(() => error);
        })
      );
  }

}
