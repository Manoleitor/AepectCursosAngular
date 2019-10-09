import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntradaComponent } from './components/entrada/entrada.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { Injectable } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { HomePonenteComponent } from './components/home-ponente/home-ponente.component';

@NgModule({
  declarations: [
    AppComponent,
    EntradaComponent,
    NavBarComponent,
    HomePonenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
