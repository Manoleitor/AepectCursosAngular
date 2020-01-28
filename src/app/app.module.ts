import { StoreDataService } from './services/store-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HomePonenteComponent } from './components/home-ponente/home-ponente.component';
import { NavBarPonenteComponent } from './components/nav-bar-ponente/nav-bar-ponente.component';
import { EdicionCursoComponent } from './components/edicion-curso/edicion-curso.component';


@NgModule({
  declarations: [
    AppComponent,
    EntradaComponent,
    NavBarComponent,
    HomePonenteComponent,
    NavBarPonenteComponent,
    EdicionCursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StoreDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
