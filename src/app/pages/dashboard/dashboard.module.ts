import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]

})
export class DashboardModule { }
