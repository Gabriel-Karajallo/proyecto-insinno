
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataManagementService } from '../../core/services/data-management.service';
import { AuthService } from '../../core/auth/auth.service';
import { PersistenceService } from '../../core/services/persistence.service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User | null = null;
  newPassword: string = '';

  constructor(
    private dataManagementService: DataManagementService,
    private persistenceService: PersistenceService,
    private router: Router,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
  }


  // Cargar datos del usuario desde el token
  loadUserData(): void {
    const token = this.persistenceService.getFromLocalStorage();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const id = decodedToken?.id;  // Extraemos el 'id' del token
      console.log('ID extraído del token:', id);
      if (id) {
        this.dataManagementService.getUser(id).subscribe({
          next: (user) => {
            console.log('Datos del usuario recibidos:', user);
            this.user = user;  // Guardamos los datos del usuario
            console.log('Los datos del usuario:' + user)
          },
          error: (err) => {
            console.error('Error al cargar datos del usuario:', err);
          }
        });
      } else {
        console.error('No se pudo obtener el id del token.');
      }
    } else {
      console.error('Token no disponible en localStorage.');
    }
  }

  // Decodificar el token (JWT)
  decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];  // Decodificar el payload
      const decodedPayload = JSON.parse(atob(payload));
      console.log('Payload decodificado del token:', decodedPayload);
      return decodedPayload;  // Retornamos todo el payload, que incluye el 'id'
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  // Eliminar cuenta
  onDeleteAccount(): void {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no puede deshacerse.');
    if (confirmed) {
      const token = this.persistenceService.getFromLocalStorage();
      if (token) {
        const decodedToken = this.decodeToken(token);

        if (decodedToken && decodedToken.id) {
          const id = decodedToken.id; // Extraemos el ID del usuario del token

          this.AuthService.deleteAccount(id).subscribe({
            next: () => {
              alert('Cuenta eliminada exitosamente.');
              this.persistenceService.removeFromLocalStorage(); // Elimina el token
              this.router.navigate(['/login']); // Redirige al login
            },
            error: (err) => {
              console.error('Error al eliminar la cuenta:', err);
              alert('Ocurrió un error al intentar eliminar la cuenta.');
            }
          });
        } else {
          console.error('No se pudo obtener el Id del token.');
        }
      } else {
        console.error('Token no disponible en localStorage.');
      }
    }
  }


  // Manejar la actualización de la contraseña
  onSubmitPassword(): void {
    // Aquí puedes agregar lógica para enviar la nueva contraseña al backend.
    console.log('Nueva contraseña:', this.newPassword);
  }


}
