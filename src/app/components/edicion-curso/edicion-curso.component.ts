import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from './../../clases/curso';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { asistente } from 'src/app/clases/asistente';
import "snapsvg-cjs";

@Component({
  selector: 'app-edicion-curso',
  templateUrl: './edicion-curso.component.html',
  styleUrls: ['./edicion-curso.component.css']
})
export class EdicionCursoComponent implements OnInit {

  private token: string;
  private id: number;
  private maximosParticipantes: number;
  private curso: Curso;
  private asistentes: Array<asistente>;


  constructor(private _cursosService: CursosService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location) {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.goHome();
    }

  }

  ngOnInit() {

    this.id = this._activatedRoute.snapshot.params["id"];
    this._cursosService.getCurso(this.token, this.id).subscribe(res => {
      this.curso = res;
      if (this.curso.asistentes != undefined)
      {
        this.asistentes = this.curso.asistentes;
      }
    }
    );

  }

  private goHome() {
    this._location.replaceState('/');
    this._router.navigate(['home']);
  }

}
