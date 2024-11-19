import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { zoomInAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [zoomInAnimation]
})
export class RegisterComponent implements OnInit{
  public registerForm!: FormGroup;
  isLoading: boolean = true; //spinner de carga
  loadRegister: boolean = false; //spinner de registro
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],

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
      const { username, password } = this.registerForm.value;

      this.loadRegister = true; //mostrar el spinner mientras se hace la peticion
      // Aquí se llamaría al servicio de autenticación para registrar al usuario
      this.authService.register(username, password).subscribe(
        (response) => {
          this.loadRegister = false;
          console.log('Registro exitoso:', response);

          //mensaje de registro exitoso en pantalla
          this.snackBar.open('Usuario registrado con éxito', 'Cerrar', {
            duration: 3000,
          });

          //limpiar los campos del formulario
          this.registerForm.reset({
            username: '',
            password: '',
            confirmPassword: '',
          });

          // redirigir al login
          this.router.navigate(['/login']);
        },
        (error) => {
          this.loadRegister = false;
          this.errorMessage = 'Ha ocurrido un error. Intentalo de nuevo'
          console.error('Error en el registro:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    };

  }

  toggleShowPassword( event: any ): void{
    this.showPassword = event.checked;
  }
}
