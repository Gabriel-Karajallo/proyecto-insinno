import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';



import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { SharedModule } from './shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LayoutComponent } from './layout/layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DeleteAccountDialogComponent } from './shared/pages/delete-acount/delete-acount.component';
import { ContactConfirmationDialogComponent } from './shared/pages/contact-confirmation-dialog/contact-confirmation-dialog.component';
import { ConcertPageComponent } from './pages/concert-page/concert-page.component';
import { CardsComponent } from './components/cards/cards.component';
import { environments } from './environment/environment';
import { UserServiceMockService } from './core/interceptors/user-service-mock.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Error404PageComponent,
    LayoutComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    DeleteAccountDialogComponent,
    ContactConfirmationDialogComponent,
    ConcertPageComponent,
    CardsComponent,

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,


    MaterialModule,
    DashboardModule,
    SharedModule,
    MatSnackBarModule
  ],
  exports: [
  ],

  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ...(environments.isMock ? [{
      provide: HTTP_INTERCEPTORS,
      useClass: UserServiceMockService,
      multi: true
    }] : [])
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
