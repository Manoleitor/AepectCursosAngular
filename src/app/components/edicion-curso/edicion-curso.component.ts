import { Router } from '@angular/router';
import { CursosService } from './../../services/cursos-service.service';
import { Curso } from './../../clases/curso';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edicion-curso',
  templateUrl: './edicion-curso.component.html',
  styleUrls: ['./edicion-curso.component.css']
})
export class EdicionCursoComponent implements OnInit {

  private token: string;


  constructor(private _CursosService: CursosService,
    private _router: Router,
    private _location: Location) {
      this.token = localStorage.getItem('token');
      if(this.token == null)
      {
        this.goHome();
      }

  }

  ngOnInit() {
  }

  private goHome() {
    this._location.replaceState('/');
    this._router.navigate(['home']);
  }

}
