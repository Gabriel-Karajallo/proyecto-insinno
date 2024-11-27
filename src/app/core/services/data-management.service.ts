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
    return this.persistenceService.getFromLocalStorage('authToken');
  }

  //  datos del usuarioObtener
  public getUser(userId: string): Observable<any> {
    return this.rest.getUser(userId);
  }

}
