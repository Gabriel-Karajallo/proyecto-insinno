import { DataManagementService } from './../../core/services/data-management.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  concerts: any[] = [];
  errorMenssage: string = '';

  constructor(private DataManagementService: DataManagementService) { }

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(): void {
    this.DataManagementService.getProducts().subscribe(
      (data) => {
        // Aseguramos que la respuesta es un array de conciertos
        this.concerts = data;
        console.log('Datos de conciertos: ', this.concerts); // Verifica que la respuesta es correcta
      },
      (error) => {
        // En caso de error, se mostrará un mensaje y el error en la consola
        this.errorMenssage = 'Error al cargar los eventos.';
        console.error('Error al obtener los conciertos: ', error);
      }
    );
  }
}
