import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isLoggedIn = false;

  constructor(private AuthService: AuthService) {
    this.isLoggedIn = this.AuthService.isAuthenticated();
  }
}
