import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Para obtener el ID desde la URL
import { DataManagementService } from './../../core/services/data-management.service';
import { Router } from '@angular/router';
import { sliderAnimation } from '../../shared/animations/animations';
@Component({
  selector: 'app-concert-page',
  templateUrl: './concert-page.component.html',
  styleUrls: ['./concert-page.component.css'],
  animations: [sliderAnimation]
})
export class ConcertPageComponent implements OnInit {
  concert: any; // Datos del concierto
  tickets: { category: string, price: number, count: number }[] = []; // Información de entradas
  maxTickets: number = 6; // Límite de entradas por categoría
  isInfoVisible: boolean = false; // Estado para mostrar u ocultar la información
  constructor(
    private route: ActivatedRoute,
    private dataManagementService: DataManagementService,
    private router: Router
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
    if (this.getTotalTickets() === 0) {
      alert('Debes seleccionar al menos una entrada antes de continuar.');
      return;
    }
    // Si ya hay entradas seleccionadas, navegar al checkout
    this.router.navigate(['checkout'], {
      state: {
        tickets: this.tickets,
        concert: this.concert,
      },
    });
  }

  toggleInfo(): void {
    this.isInfoVisible = !this.isInfoVisible; // Alternar la visibilidad del texto
  }
}
