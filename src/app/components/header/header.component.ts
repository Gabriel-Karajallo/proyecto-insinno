import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { DataManagementService } from '../../core/services/data-management.service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  styles: `
    #menu{color: #ffff;}
    #sidebarItems{font-family:"Figtree", sans-serif; }
  `
})
export class HeaderComponent {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  // Llamada al método logout()
  logout(): void {
    this.authService.logout();
  }
  public sidebarItems = [
    { label: 'Eventos', icon: 'music_note', url: './dashboard/products' },
    { label: 'Contacto', icon: 'call', url: '/dashboard/contact' },
    { label: 'Perfil', icon: 'person', url: '/dashboard/profile' },
    { label: 'Cerrar sesión', icon: 'logout', action: () => this.logout() }
  ]

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
