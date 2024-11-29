import { Injectable } from '@angular/core';
import { PersistenceService } from '../services/persistence.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {


  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private rest: RestService,
  ) { }

  //guardar el token en el almacenamiento
  // public saveToken(token: string): void {
  //   this.persistenceService.saveToLocalStorage(token)
  // }

  //obtener el token
  public getToken(): string | null {
    return this.persistenceService.getFromLocalStorage();
  }

  //  datos del usuarioObtener
  public getUser(id: string): Observable<any> {
    console.log('DataManagementService: ID recibido para buscar usuario:', id);
    return this.rest.getUser(id);
  }

}
