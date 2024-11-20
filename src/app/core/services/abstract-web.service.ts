import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbstractWebService {

  constructor(protected http: HttpClient) {}

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
    return this.http.get<T>(`${environments.baseUrl}${url}`);
  }

  // PUT (actualizar)
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${environments.baseUrl}${url}`, body);
  }

  // DELETE (eliminar)
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${environments.baseUrl}${url}`);
  }
}
