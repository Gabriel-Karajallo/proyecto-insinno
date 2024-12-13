import { concerts } from './../../interfaces/concert';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
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
  private mockDataUrl = '/assets/mock-data/concert-mock-data.json'; // Ruta del archivo JSON
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

  //metodo get para la api de ticketmaster
  getProducts(): Observable<any[]> {
    const url = `${environments.baseUrl}${environments.apiPrefix}${endPoints.events}${endPoints.layout}`
    return this.http.get<any[]>(url);
  }

  getCity(city: string): Observable<any[]> {
    const url = `${environments.baseUrl}${environments.apiPrefix}${endPoints.events}/city/${city}`
    return this.http.get<any[]>(url);
  }

  // Método para obtener los detalles de un concierto por ID
  getConcertById(id: string): Observable<any> {
    const url = `${environments.baseUrl}${environments.apiPrefix}/events/${id}`;
    const mockData = {
      name: 'Duki',
      images: [{ url: 'https://www.mondosonoro.com/wp-content/uploads/2024/11/Duki.jpg' }],
      classifications: [{ genre: { name: 'Rock' } }],
      dates: { start: { localDate: '2023-12-12', localTime: '20:00' } },
      _embedded: { venues: [{ name: 'Auditorio Nacional', country: { name: 'México' } }] },
      ticketCategories: [
        { name: 'General', price: 50 },
        { name: 'VIP', price: 100 }
      ]
    };

    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.warn('No se pudo obtener los datos del backend, usando datos simulados.', error);
        return of(mockData); // Devolver datos simulados
      })
    );
  }
}
