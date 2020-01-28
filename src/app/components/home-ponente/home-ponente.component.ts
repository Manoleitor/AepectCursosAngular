import { StoreDataService } from './../../services/store-data.service';
import { Curso } from './../../clases/curso';
import { CursosService } from '../../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home-ponente',
  templateUrl: './home-ponente.component.html',
  styleUrls: ['./home-ponente.component.css']
})
export class HomePonenteComponent implements OnInit {

  private token: string;
  public cursos : Array<Curso>;


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
    this._CursosService.getCursosPonente(this.token).subscribe(res=>
      {
        this.cursos = res;
      }
    );
  }

  private goHome() {
    this._location.replaceState('/');
    this._router.navigate(['home']);
  }

  public verDetalle(id:string)
  {
    this._router.navigate(['edicion-curso', id]);
  }

}
