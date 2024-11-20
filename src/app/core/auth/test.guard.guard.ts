import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DataManagementService } from '../services/data-management.service';

export const testGuardGuard: CanActivateFn = (route, state) => {
  const dataService = inject(DataManagementService);

  const router = inject(Router); //en caso de que no se autentique poder redirigir


  if (dataService.isAuthenticated()) {
    return true;  // Permite el acceso si está autenticado
  } else {
    router.navigate(['/login']);
    return false;
  }
};
