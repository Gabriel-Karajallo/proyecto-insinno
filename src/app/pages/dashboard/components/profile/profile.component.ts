import { PersistenceService } from './../../../../core/services/persistence.service';
import { Component, OnInit } from '@angular/core';
import { DataManagementService } from '../../../../core/services/data-management.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent  implements OnInit {
  user: any = null;
  newPassword: string = '';

  constructor(
    private dataManagementService: DataManagementService,
    private persistenceService: PersistenceService,
    private router: Router,
    private AuthService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }


  // Cargar datos del usuario desde el token
  loadUserData(): void {
    const token = this.persistenceService.getFromLocalStorage('authtoken');
    if (token) {
      const userId = this.decodeToken(token)?.id; // Decodifica el token para obtener el userId
      if (userId) {
        this.dataManagementService.getUser(userId).subscribe({
          next: (user) => {
            this.user = user;
          },
          error: (err) => {
            console.error('Error al cargar datos del usuario:', err);
          }
        });
      } else {
        console.error('No se pudo obtener el userId del token.');
      }
    } else {
      console.error('Token no disponible en localStorage.');
    }
  }

  // Decodificar el token (JWT)
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }


  // Eliminar cuenta
  onDeleteAccount(): void {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no puede deshacerse.');
    if (confirmed) {
      const token = this.persistenceService.getFromLocalStorage('token');
      if (token) {
        const userId = this.decodeToken(token)?.id;
        if (userId) {
          this.AuthService.deleteAccount(userId).subscribe({
            next: () => {
              alert('Cuenta eliminada exitosamente.');
              this.persistenceService.removeFromLocalStorage('token'); // Limpia el token
              this.router.navigate(['/login']); // Redirige al login
            },
            error: (err) => {
              console.error('Error al eliminar la cuenta:', err);
              alert('Ocurrió un error al intentar eliminar la cuenta.');
            }
          });
        } else {
          console.error('No se pudo obtener el userId del token.');
        }
      } else {
        console.error('Token no disponible en localStorage.');
      }
    }
  }


}
