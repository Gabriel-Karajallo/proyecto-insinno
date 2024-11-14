import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('zoomInAnimation', [
      transition(':enter', [ // Animación cuando el elemento entra al DOM
        style({ transform: 'scale(0)', opacity: 0 }), // Estado inicial
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })) // Estado final
      ]),
    ])
  ]
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
          this.isLoading = false;
          this.AuthService.saveToken(response.token); // detener spinner
          console.log('Respuesta:', response);//guadar el token en localstorage

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
