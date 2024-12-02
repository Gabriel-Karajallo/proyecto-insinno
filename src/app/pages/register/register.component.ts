import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { zoomInAnimation } from '../../shared/animations/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [zoomInAnimation]
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  isLoading: boolean = true; //spinner de carga
  loadRegister: boolean = false; //spinner de registro
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          this.passwordComplexityValidator
        ]],
        confirmPassword: ['', [Validators.required]],

      },
      { validators: this.passwordMatchValidator }
    );

    // spinner durante unos segundos
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  // Validador personalizado para la complejidad de la contraseña
  passwordComplexityValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;

    // Expresión regular para al menos 1 mayúscula y 1 número
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

    if (password && !regex.test(password)) {
      return { complexityError: true }; // Devuelve un error si no cumple
    }
    return null; // Válido si cumple
  }


  // Validador para comprobar que las contraseñas coinciden
  passwordMatchValidator(control: FormGroup): { [s: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    //verificamos si los dos controles existen
    if (!password || !confirmPassword) {
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
      const { username, password, email } = this.registerForm.value;

      this.loadRegister = true; //mostrar el spinner mientras se hace la peticion
      // Aquí se llamaría al servicio de autenticación para registrar al usuario
      this.authService.register(username, password, email).subscribe(
        (response) => {
          this.loadRegister = false;
          console.log('Registro exitoso:', response);


          // Mostrar Snackbar con mensaje de éxito
          this.snackBar.open('¡Usuario registrado con éxito! Ahora puedes iniciar sesión.', 'X', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['custom-snackbar']
          });

          //limpiar los campos del formulario
          this.registerForm.reset({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });

          // Redirigir al login después de mostrar el mensaje
          this.router.navigate(['/login']);

        },
        (error) => {
          this.loadRegister = false;
          if (error.status === 400) {
            this.errorMessage = 'Ese nombre de usuario ya está registrado';
          } else {
            this.errorMessage = 'Error al registrar el usuario. Inténtalo de nuevo más tarde.';
          }
        }
      );
    } else {
      console.log('Formulario no válido');
    };

  }

  toggleShowPassword(event: any): void {
    this.showPassword = event.checked;
  }

}
