import { DataManagementService } from './../../core/services/data-management.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  concerts: any[] = [];
  featuredConcert: any;
  errorMenssage: string = '';
  title: string = 'LO MÁS BUSCADO';  // Título que se cambiará dinámicamente
  isSearching: boolean = false;  // Indica si se está haciendo una búsqueda
  filteredConcerts: any[] = [];  // Lista de conciertos filtrados por ciudad

  constructor(
    private DataManagementService: DataManagementService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadConcerts();  // Cargar los conciertos iniciales

    // Obtenemos los parámetros de búsqueda desde la URL (por ciudad)
    this.route.queryParams.subscribe(params => {
      const city = params['city'];

      if (city) {
        this.isSearching = true;  // Establecer que estamos en modo de búsqueda
        this.title = city.toUpperCase();  // Cambiar el título a la ciudad
        this.searchEventsByCity(city);  // Buscar eventos por ciudad
      } else {
        this.isSearching = false;  // No estamos buscando
        this.title = 'LO MÁS BUSCADO';  // Título predeterminado
        this.fetchAllProducts();  // Cargar todos los productos si no hay búsqueda
      }
    });
  }

  loadConcerts(): void {
    // Cargar todos los conciertos al principio
    this.DataManagementService.getProducts().subscribe(
      (data) => {
        this.concerts = data;
        this.filteredConcerts = data;  // Al principio, mostramos todos los conciertos
        console.log('Datos de conciertos: ', this.concerts);  // Verifica que la respuesta es correcta
      },
      (error) => {
        this.errorMenssage = 'Error al cargar los eventos.';
        console.error('Error al obtener los conciertos: ', error);
      }
    );
  }

  fetchAllProducts() {
    // Cargar todos los productos
    this.DataManagementService.getProducts().subscribe(
      (data: any) => {
        this.concerts = data;
        this.filteredConcerts = data;  // Mostrar todos los productos si no hay filtro
      },
      error => {
        console.error('Error al cargar los productos:', error);
        this.concerts = [];
        this.filteredConcerts = [];
      }
    );
  }

  searchEventsByCity(city: string) {
    // Si hay ciudad en los parámetros de búsqueda, filtramos los conciertos
    this.DataManagementService.getCity(city).subscribe(
      (data: any) => {
        this.filteredConcerts = data;  // Asignamos los resultados filtrados
      },
      error => {
        console.error('Error al buscar eventos por ciudad:', error);
        this.filteredConcerts = [];
      }
    );
  }
}
