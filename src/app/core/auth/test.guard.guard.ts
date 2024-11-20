import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const testGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  const router = inject(Router); //en caso de que no se autentique poder redirigir


  if (authService.isAuthenticated()) {
    return true;  // Permite el acceso si está autenticado
  } else {
    router.navigate(['/login']);
    return false;
  }
};
