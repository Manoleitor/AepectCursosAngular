import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/clases/curso';
import { CursosService } from 'src/app/services/cursos.service';
import { createCursoRQ } from 'src/app/clases/createCursoRQ';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-curso',
  templateUrl: './nuevo-curso.component.html',
  styleUrls: ['./nuevo-curso.component.css']
})
export class NuevoCursoComponent implements OnInit {


  public curso:Curso;
  private token:string;

  constructor(private _cursoService:CursosService,
    private _router: Router) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.curso = new Curso();
    this.curso.transporte=0;
    this.curso.movil = 0;
    this.curso.habitacion = 0;
    this.curso.cena = 0;
  }


  changeCena(){
    this.curso.cena = this.curso.cena == 1 ? 0 : 1 ; 
  }

  changeHabitacion(){
    this.curso.habitacion = this.curso.habitacion == 1 ? 0 : 1 ; 
  }

  changeMovil(){
    this.curso.movil = this.curso.movil == 1 ? 0 : 1 ; 
  }

  changeTransporte(){
    this.curso.transporte = this.curso.transporte == 1 ? 0 : 1 ; 
  }

  crearNuevoCurso(curso:Curso)
  {
    // console.log(curso);

    const RQ:createCursoRQ = {
      token:this.token,
      curso:curso
    }


    this._cursoService.postCurso(RQ).subscribe(res=>{
      if(res.error=="Exito")
      {

      }else{
        console.log(res.error);
      }
      this._router.navigate(["home-ponente"]);
    },error=>{
      console.log(error);
      this._router.navigate(["home-ponente"]);
    });
  }

}
