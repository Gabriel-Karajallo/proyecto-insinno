import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  // Llamada al método logout()
  logout(): void {
    this.authService.logout();
  }
}
