import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { testGuardGuard } from './core/auth/test.guard.guard';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    // canActivate: [testGuardGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'order', component: OrdersComponent },
      { path: '', redirectTo: '/dashboard/products', pathMatch: 'full' },
      { path: '**', redirectTo: '/dashboard/products' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
