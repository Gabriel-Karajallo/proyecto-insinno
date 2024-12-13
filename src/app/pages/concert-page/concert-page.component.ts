import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el ID desde la URL
import { DataManagementService } from './../../core/services/data-management.service';

@Component({
  selector: 'app-concert-page',
  templateUrl: './concert-page.component.html',
  styleUrls: ['./concert-page.component.css']
})
export class ConcertPageComponent implements OnInit {
  concert: any; // Datos del concierto
  tickets: { category: string, price: number, count: number }[] = []; // Información de entradas
  maxTickets: number = 6; // Límite de entradas por categoría

  constructor(
    private route: ActivatedRoute,
    private dataManagementService: DataManagementService
  ) { }

  ngOnInit(): void {
    // Obtener el ID del concierto desde la URL
    const concertId = this.route.snapshot.paramMap.get('id');
    if (concertId) {
      this.getConcertDetails(concertId);
    }
  }

  // Obtener detalles del concierto
  getConcertDetails(id: string): void {
    this.dataManagementService.getConcertById(id).subscribe(
      (data: any) => {
        this.concert = data;

        // Inicializar categorías de entradas
        this.tickets = data.ticketCategories.map((category: any) => ({
          category: category.name,
          price: category.price,
          count: 0 // Inicialmente no hay entradas seleccionadas
        }));
      },
      (error) => {
        console.error('Error al obtener los detalles del concierto:', error);

        // Simulación de datos para pruebas
        this.concert = {
          name: 'Duki',
          images: [{ url: 'https://www.mondosonoro.com/wp-content/uploads/2024/11/Duki.jpg' }],
          classifications: [{ genre: { name: 'Rock' } }],
          dates: { start: { localDate: '2023-12-12', localTime: '20:00' } },
          _embedded: { venues: [{ name: 'Auditorio Nacional', country: { name: 'México' } }] },
          ticketCategories: [
            { name: 'General', price: 50 },
            { name: 'VIP', price: 100 }
          ]
        };

        this.tickets = this.concert.ticketCategories.map((category: any) => ({
          category: category.name,
          price: category.price,
          count: 0
        }));
      }
    );
  }

  // Incrementar el número de entradas para una categoría
  addTicket(index: number): void {
    const totalTickets = this.getTotalTickets();
    if (totalTickets < this.maxTickets) {
      this.tickets[index].count++;
    } else {
      alert('No puedes seleccionar más de 6 entradas en total.');
    }
  }

  // Decrementar el número de entradas para una categoría
  removeTicket(index: number): void {
    if (this.tickets[index].count > 0) {
      this.tickets[index].count--;
    }
  }

  // Calcular el total de entradas seleccionadas
  getTotalTickets(): number {
    return this.tickets.reduce((sum, ticket) => sum + ticket.count, 0);
  }

  // Navegar a la página de compra
  goToCheckout(): void {
    // Aquí puedes implementar la navegación a la página de compra
    console.log('Ir a la página de compra con:', this.tickets);
  }
}
