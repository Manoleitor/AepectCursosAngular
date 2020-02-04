import { NuevoAsistenteFormComponent } from './components/nuevo-asistente-form/nuevo-asistente-form.component';
import { EdicionCursoComponent } from './components/edicion-curso/edicion-curso.component';
import { HomePonenteComponent } from './components/home-ponente/home-ponente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntradaComponent } from './components/entrada/entrada.component';


const routes: Routes = [
  { path: 'home', component: EntradaComponent },
  { path: 'home-ponente', component: HomePonenteComponent },
  { path: 'nuevo-asistente-form/:id/:nombre/:anio', component: NuevoAsistenteFormComponent },
  { path: 'edicion-curso/:id', component:EdicionCursoComponent},
  { path: '**', component: EntradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
