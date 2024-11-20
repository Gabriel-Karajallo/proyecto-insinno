import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
      children: [
        { path: 'products', component: ProductsComponent },
        { path: 'order', component: OrdersComponent },
        { path: '', redirectTo: 'products', pathMatch: 'full' },
        { path: '**', redirectTo: 'products' }
      ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
