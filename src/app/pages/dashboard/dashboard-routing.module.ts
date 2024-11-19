import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from './components/products/products.component';
const routes: Routes = [
  {
    path: '', //ruta raíz
    component: DashboardComponent,
    children: [
      {
        path: 'products', // Ruta hija para el componente Products
        component: ProductsComponent,
      },
      {
        path: '', // Ruta por defecto que redirecciona al hijo principal
        redirectTo: 'products',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
