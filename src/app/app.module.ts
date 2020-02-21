import { StoreDataService } from './services/store-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { Injectable } from '@angular/core';
import { HttpClientModule, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomePonenteComponent } from './components/home-ponente/home-ponente.component';
import { NavBarPonenteComponent } from './components/nav-bar-ponente/nav-bar-ponente.component';
import { EdicionCursoComponent } from './components/edicion-curso/edicion-curso.component';
import { NuevoAsistenteFormComponent } from './components/nuevo-asistente-form/nuevo-asistente-form.component';
import { InterceptorService } from './services/interceptor.service';
import { NuevoCursoComponent } from './components/nuevo-curso/nuevo-curso.component';



@NgModule({
  declarations: [
    AppComponent,
    EntradaComponent,
    NavBarComponent,
    HomePonenteComponent,
    NavBarPonenteComponent,
    EdicionCursoComponent,
    NuevoAsistenteFormComponent,
    NuevoCursoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule      
  ],
  providers: [
    StoreDataService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
