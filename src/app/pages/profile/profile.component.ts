
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataManagementService } from '../../core/services/data-management.service';
import { AuthService } from '../../core/auth/auth.service';
import { PersistenceService } from '../../core/services/persistence.service';
import { DeleteAccountDialogComponent } from '../../shared/pages/delete-acount/delete-acount.component';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: User | null = null;
  email: User | null = null;

  // actualizar datos del usuario
  newPassword: string = '';
  newEmail: string = '';
  newUsername: string = '';
  isLoading1 = false;
  isLoading2 = false;
  isLoading3 = false;
  errorMessage: string | null = null;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
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
  public onDeleteAccount(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        const token = this.persistenceService.getFromLocalStorage();
        if (token) {
          const decodedToken = this.decodeToken(token);

          if (decodedToken && decodedToken.id) {
            const id = decodedToken.id; // Extraemos el ID del usuario del token

            this.AuthService.deleteAccount(id).subscribe({
              next: () => {
                this.snackBar.open('Cuenta eliminada exitosamente.', 'Cerrar', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  panelClass: ['custom-snackbar']
                });

                // Eliminación exitosa
                this.persistenceService.removeFromLocalStorage(); // Elimina el token
                this.persistenceService.clearLocalStorage(); //  refresh token

                // Redirige al login
                this.router.navigate(['/login']);

              },
              error: (err) => {
                console.error('Error al eliminar la cuenta:', err);
                this.snackBar.open('Ocurrió un error al intentar eliminar la cuenta.', 'Cerrar', {
                  duration: 3000,
                  panelClass: ['error-snackbar'],
                });
              },
            });
          } else {
            console.error('No se pudo obtener el ID del token.');
          }
        } else {
          console.error('Token no disponible en localStorage.');
        }
      }
    });
  };


  // Actualizar nombre de usuario
  updateUsername() {
    if (!this.newUsername) return; // Verifica que el campo no esté vacío
    this.isLoading1 = true;
    this.dataManagementService.updateUsername(this.newUsername).subscribe(
      (response) => {
        this.isLoading1 = false;
        console.log('Nombre de usuario actualizado:', response);
      },
      (error) => {
        this.isLoading1 = false;
        this.errorMessage = 'Error al actualizar el nombre de usuario';
        console.error(error);
      }
    );
  }

  // Actualizar contraseña
  updatePassword() {
    if (!this.newPassword) return;
    this.isLoading2 = true;
    this.dataManagementService.updatePassword(this.newPassword).subscribe(
      (response) => {
        this.isLoading2 = false;
        console.log('Contraseña actualizada:', response);
      },
      (error) => {
        this.isLoading2 = false;
        this.errorMessage = 'Error al actualizar la contraseña';
        console.error(error);
      }
    );
  }

  // Actualizar correo
  updateEmail() {
    if (!this.newEmail) return;
    this.isLoading3 = true;
    this.dataManagementService.updateEmail(this.newEmail).subscribe(
      (response) => {
        this.isLoading3 = false;
        console.log('Correo actualizado:', response);
      },
      (error) => {
        this.isLoading3 = false;
        this.errorMessage = 'Error al actualizar el correo';
        console.error(error);
      }
    );
  }



}
