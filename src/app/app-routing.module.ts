import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/dashboard/components/products/products.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { testGuardGuard } from './core/auth/test.guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    // canActivate: [testGuardGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'products', component: ProductsComponent,
    // canActivate: [testGuardGuard],
   },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '404', component: Error404PageComponent },
  { path:'**', redirectTo: '404', pathMatch:'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
