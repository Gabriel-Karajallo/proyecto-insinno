import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { zoomInAnimation } from '../../shared/animations/animations';
import { PersistenceService } from '../../core/services/persistence.service';
import { DataManagementService } from '../../core/services/data-management.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [zoomInAnimation]
})

export class LoginComponent implements OnInit {
  errorMessage: string = '';
  isLoading: boolean = false; //spinner


  public loginForm: FormGroup;

  //formulario y validaciones
  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router,
    private PersistenceService: PersistenceService,
    private DataManagementService: DataManagementService,
    private http: HttpClient,
  ) {

    //Formularo reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required,]],
    });
  }

  authenticateWithGoogle(): void {
    // URL de la API de backend para la autenticación con Google
    const googleAuthUrl = 'http://192.168.1.191:8080/oauth2/authorization/google';

    window.location.href = googleAuthUrl;

    // Hacer la solicitud GET
    // this.http.get(googleAuthUrl, { responseType: 'text' }).subscribe(
    //   (response) => {
    //     console.log('Autenticación exitosa:', response);


    //     this.router.navigate(['/dashboard']);
    //   },
    //   (error) => {
    //     console.error('Error en la autenticación con Google:', error);
    //     alert('Hubo un error al intentar autenticar con Google. Intenta de nuevo.');
    //   }
    // );
  }

  ngOnInit(): void {
    // Verifica si hay un token guardado. Si existe, redirige al dashboard.
    const token = this.PersistenceService.getFromLocalStorage();
    if (token) {
      this.router.navigate(['/dashboard']); // Redirige automáticamente al dashboard si ya hay un token.
    }
  }
  //manejar el envio del formulario
  ngOnSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Elimina el token anterior si existe antes de hacer el login
      this.PersistenceService.removeFromLocalStorage()
      this.PersistenceService.removeFromLocalStorage();

      // Mostrar spinner mientras se hace la petición
      this.isLoading = true;

      this.AuthService.login(username, password).subscribe(
        (response) => {
          this.isLoading = false;// detener spinner
          this.PersistenceService.getFromLocalStorage(); //guadar el token en localstorage
          console.log('Respuesta:', response);

          //si la auteticacion vale, guarda el token y redirige al dashboard
          this.router.navigate(['/dashboard']); //redirige al dashboard
        },
        (error) => {
          this.isLoading = false; //detener spinner
          this.errorMessage = 'Usuario o contraseña incorrectos'
          console.log('Error de autenticación:', error)
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
