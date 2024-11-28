import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  styles: `
    #menu{color: #ffff;}
  `
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  // Llamada al método logout()
  logout(): void {
    this.authService.logout();
  }
  public sidebarItems = [
    { label: 'Conciertos', icon: 'music_note', url: './list' },
    { label: 'aaaaaaa', icon: 'celebration', url: './new-hero' },
    { label: 'Contacto', icon: 'call', url: '/dashboard/contact' },
    { label: 'Perfil', icon: 'person', url: '/dashboard/profile' },
    { label: 'Cerrar sesión', icon: 'logout', action: () => this.logout() }
  ]

  navigateTo(url: string): void {
    this.router.navigate([url]);
  }
}
