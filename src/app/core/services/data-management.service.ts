import { Injectable } from '@angular/core';
import { PersistenceService } from '../services/persistence.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataManagementService {

  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService
  ) { }

  //guardar el token en el almacenamiento
  saveToken(token: string): void {
    this.persistenceService.saveToLocalStorage('token', token)
  }

  //obtener el token
  getToken(): string | null {
    return this.persistenceService.getFromLocalStorage('token');
  }
}
