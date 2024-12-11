import { DataManagementService } from './../../core/services/data-management.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  concerts: any[] = [];
  featuredConcert: any;
  errorMenssage: string = '';
  title: string = 'LO MÁS BUSCADO';
  isSearching: boolean = false; // Indica si se está haciendo una búsqueda

  constructor(
    private DataManagementService: DataManagementService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadConcerts();
    this.route.queryParams.subscribe(params => {
      const city = params['city'];
      if (city) {
        this.isSearching = true;
        this.title = city.toUpperCase();
        this.searchEventsByCity(city);
      } else {
        this.isSearching = false;
        this.title = 'LO MÁS BUSCADO';
        this.fetchAllProducts();
      }
    });
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

  fetchAllProducts() {
    this.DataManagementService.getProducts().subscribe(
      (data: any) => {
        this.concerts = data;
      },
      error => {
        console.error('Error al cargar los productos:', error);
        this.concerts = [];
      }
    );
  }

  searchEventsByCity(city: string) {
    this.DataManagementService.getCity(city).subscribe(
      (data: any) => {
        this.concerts = data;
      },
      error => {
        console.error('Error al buscar eventos por ciudad:', error);
        this.concerts = [];
      }
    );
  }
}
