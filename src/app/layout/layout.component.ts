import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isLoggedIn = false;

  constructor(private AuthService: AuthService) {
    this.isLoggedIn = this.AuthService.isAuthenticated();
  }
}
