import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit{
  sidebarVisible: boolean = false;

  items: MenuItem[] | undefined;

 ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Productos',
                items: [
                    {
                        label: 'Conciertos',
                        icon: 'pi pi-plus',
                    },
                    {
                        label: 'Festivales',
                        icon: 'pi pi-search',
                    },
                    {
                      label: 'Contacto',
                      icon: 'pi pi-search',
                  }
                ]
            },
            {
                label: 'Perfil',
                items: [
                    {
                        label: 'Configuración',
                        icon: 'pi pi-cog',
                    },
                    {
                        label: 'Cerrar sesión',
                        icon: 'pi pi-sign-out',
                    }
                ]
            },
            {
                separator: true
            }
        ];
    }
}
