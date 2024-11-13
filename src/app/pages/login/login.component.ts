import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit{

  errorMessage: string = '';
  isLoading: boolean = false; //spinner
  hidePassword: boolean = true; // true para ocultar la con

  public loginForm: FormGroup;


  //formulario y validaciones
  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router ) {

    //Formularo reactivo
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}
  //manejar el envio del formulario
  ngOnSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      // Mostrar spinner mientras se hace la petición
      this.isLoading = true;

      this.AuthService.login(username, password).subscribe(
        (response) => {
          this.isLoading = false; // detener spinner
          console.log('Respuesta:', response);

          //si la auteticacion vale, guarda el token y redirige al dashboard
          localStorage.setItem('token', response.token); //guadar el token en localstorage

          this.router.navigate(['/dashboard']); //redirige al dashboard
        },
        (error) => {
          this.isLoading = false; //detener spinner
          this.errorMessage = 'Credenciales incorrectas'
          console.log('Error de autenticación:', error)
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }



}
