import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],


})
export class DashboardModule { }
