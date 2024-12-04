import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataManagementService } from '../../core/services/data-management.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  concerts: any[] = [];

  constructor(private DataManagementService: DataManagementService) { }

  ngOnInit(): void {
    this.DataManagementService.getConcerts().subscribe(data => {
      this.concerts = data;
    });
  }
}
