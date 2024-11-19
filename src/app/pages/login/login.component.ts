import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { zoomInAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [zoomInAnimation]
})

export class LoginComponent implements OnInit{

  errorMessage: string = '';
  isLoading: boolean = false; //spinner

  public loginForm: FormGroup;

  //formulario y validaciones
  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router ) {

    //Formularo reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    // Verifica si hay un token guardado. Si existe, redirige al dashboard.
    const token = localStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/dashboard']); // Redirige automáticamente al dashboard si ya hay un token.
    }
  }

  //manejar el envio del formulario
  ngOnSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Elimina el token anterior si existe antes de hacer el login
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');

      // Mostrar spinner mientras se hace la petición
      this.isLoading = true;

      this.AuthService.login(username, password).subscribe(
        (response) => {
          this.isLoading = false;// detener spinner
          this.AuthService.saveToken(response.token); //guadar el token en localstorage
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
