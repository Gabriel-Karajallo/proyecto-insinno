import { concerts } from './../../interfaces/concert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';
import { PersistenceService } from './persistence.service';
import { AbstractWebService } from './abstract-web.service';
import { environments, endPoints } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {
  private apiUrl = 'http://localhost:4200/dashboard/products';
  private concertUrl = 'http://localhost:4200/dashboard/';
  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private rest: RestService,
    private AbstractWebService: AbstractWebService,
  ) { }

  //guardar el token en el almacenamiento
  // public saveToken(token: string): void {
  //   this.persistenceService.saveToLocalStorage(token)
  // }

  //obtener el token
  public getToken(): string | null {
    return this.persistenceService.getFromLocalStorage();
  }

  //  obtener datos del usuario
  public getUser(id: string): Observable<any> {
    console.log('DataManagementService: ID recibido para buscar usuario:', id);
    return this.rest.getUser(id);
  }

  //actualizar usuario
  updateUsername(username: string): Observable<any> {
    return this.rest.updateUsername(username);
  }

  //actualizar contraseña
  updatePassword(password: string): Observable<any> {
    return this.rest.updatePassword('password', password);
  }

  //actualizar correo
  updateEmail(email: string): Observable<any> {
    return this.rest.updateEmail('email', email);
  }

  //metodo get para que los products funcionen con el mock
  // getConcerts(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }


  //metodo get para la api del backend
  getProducts(): Observable<any[]> {
    const url = `${environments.baseUrl}${environments.apiPrefix}${endPoints.events}${endPoints.layout}`
    return this.http.get<any[]>(url);

  }

  // Método para obtener los detalles de un concierto por ID
  getConcertById(id: string): Observable<any> {
    const url = `${environments.baseUrl}${environments.apiPrefix}/events/${id}`; // Ajusta el endpoint de acuerdo a tu API
    return this.http.get<any>(url);
  }
}
