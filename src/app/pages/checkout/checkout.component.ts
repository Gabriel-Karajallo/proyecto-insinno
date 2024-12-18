import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  tickets: any[] = [];
  concert: any = null;
  email: string = '';
  purchaseSuccess: boolean = false; // Variable para controlar si mostrar el aviso

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // Obtener datos de la redirección
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { tickets: any[], concert: any };
    if (state) {
      this.tickets = state.tickets;
      this.concert = state.concert;
    } else {
      // Manejar si no hay datos (redirección directa a la página)
      this.router.navigate(['/']);
    }
  }

  getTotalPrice(): number {
    return this.tickets.reduce((total, ticket) => total + ticket.price * ticket.count, 0);
  }

  confirmPurchase(): void {
    // Datos para el backend
    const purchaseData = {
      concert: this.concert.name,
      tickets: this.tickets,
      email: this.email,
      total: this.getTotalPrice(),
    };

    this.http.post('http://backend.api/purchase', purchaseData).subscribe(
      () => {
        // Cambiar el estado a éxito y mostrar el aviso
        this.purchaseSuccess = true;

        // Opcional: Limpiar formulario o datos
        this.email = '';
        this.tickets = [];
      },
      (error) => {
        console.error('Error al confirmar la compra:', error);
        alert('Hubo un error al confirmar la compra. Por favor, intenta de nuevo.');
      }
    );
  }
}
