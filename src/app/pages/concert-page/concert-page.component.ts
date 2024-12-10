import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataManagementService } from '../../core/services/data-management.service';

@Component({
  selector: 'app-concert-page',
  templateUrl: './concert-page.component.html',
  styleUrl: './concert-page.component.css'
})
export class ConcertPageComponent implements OnInit {
  concert: any = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataManagementService: DataManagementService
  ) { }

  ngOnInit(): void {
    const concertId = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la URL
    if (concertId) {
      this.loadConcertDetails(concertId);
    } else {
      this.errorMessage = 'No se encontró el concierto.';
    }
  }

  loadConcertDetails(id: string): void {
    this.dataManagementService.getConcertById(id).subscribe(
      (data) => {
        this.concert = data;
      },
      (error) => {
        this.errorMessage = 'Error al cargar el concierto.';
        console.error('Error al obtener los detalles del concierto: ', error);
      }
    );
  }
}
