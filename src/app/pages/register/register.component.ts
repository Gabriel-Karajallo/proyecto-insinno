import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('zoomInAnimation', [
      transition(':enter', [ // Animación cuando el elemento entra al DOM
        style({ transform: 'scale(0)', opacity: 0 }), // Estado inicial
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 })) // Estado final
      ]),
    ])
  ]
})
export class RegisterComponent implements OnInit{
  public registerForm!: FormGroup;
  isLoading: boolean = true; //spinner de carga
  loadRegister: boolean = false; //spinner de registro

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        rememberMe: [false]
      },
      { validators: this.passwordMatchValidator }
    );

    // spinner durante unos segundos
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
  // Validador para comprobar que las contraseñas coinciden
  passwordMatchValidator(control: FormGroup): { [s: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    //verificamos si los dos controles existen
    if ( !password || !confirmPassword ){
      return null;
    }

    //si las contraseñas no coincden
    if (password.value !== confirmPassword.value) {
      // Establece un error en `confirmPassword`
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    // Si coinciden, limpiamos cualquier error previo
    confirmPassword.setErrors(null);
    return null;
  }


   // envía los datos del formulario de registro
   onRegister(): void {
    if (this.registerForm.valid) {
      const { username, password, rememberMe } = this.registerForm.value;

      this.loadRegister = true; //mostrar el spinner mientras se hace la peticion
      // Aquí se llamaría al servicio de autenticación para registrar al usuario
      this.authService.register(username, password, rememberMe).subscribe(
        (response) => {
          this.loadRegister = false;
          console.log('Registro exitoso:', response);
          // Puedes redirigir al login o al dashboard si lo prefieres
          this.router.navigate(['/login']);
        },
        (error) => {
          this.loadRegister = false;
          console.error('Error en el registro:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
