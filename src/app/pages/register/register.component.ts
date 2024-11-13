import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  public registerForm!: FormGroup;
  isLoading: boolean = true; //spinner de carga

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
    }, 2000);
  }

  // Validador personalizado para comprobar que las contraseñas coinciden
  passwordMatchValidator(control: FormGroup): { [s: string]: boolean } | null {
    if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
   // Lógica para enviar los datos del formulario de registro
   onRegister(): void {
    if (this.registerForm.valid) {
      const { username, password, rememberMe } = this.registerForm.value;

      // Aquí se llamaría al servicio de autenticación para registrar al usuario
      this.authService.register(username, password, rememberMe).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          // Puedes redirigir al login o al dashboard si lo prefieres
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en el registro:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }


}
