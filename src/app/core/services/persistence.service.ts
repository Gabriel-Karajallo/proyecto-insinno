import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  private tokenKey = 'authToken';
  // Guardar un item en el localStorage
  saveToLocalStorage(token: string): void {
    if (token && token.trim() !== '') {
      localStorage.setItem(this.tokenKey, token);  // Guardar el token en localStorage
    } else {
      console.error('Token vacío recibido, no se guardó en localStorage');
    }
  }

  // Obtener un item del localStorage
  getFromLocalStorage(token: string): string | null {
    return localStorage.getItem(token);
  }

  // Eliminar un item del localStorage
  removeFromLocalStorage(token: string): void {
    localStorage.removeItem(token);
  }

  // Limpiar todo el localStorage
  clearLocalStorage(): void {
    localStorage.clear();
  }
}
