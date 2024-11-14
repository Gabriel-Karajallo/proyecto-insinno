import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  // Guardar un item en el localStorage
  saveToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Obtener un item del localStorage
  getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  // Eliminar un item del localStorage
  removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  // Limpiar todo el localStorage
  clearLocalStorage(): void {
    localStorage.clear();
  }
}
