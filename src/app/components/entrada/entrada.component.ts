import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Curso} from '../../clases/curso';
import { CursosService} from '../../services/cursos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  public cursos: Array<Curso>;

  constructor(private _CursosService : CursosService,
    private _loginService: LoginService,
    private _router:Router) { }

  ngOnInit() {
    this._CursosService.getCursosListEntrada().subscribe(res=>{      
      this.cursos = res;
      // console.log(this.cursos);
    });
  }

  public login(usuario:string, clave: string)
  {
    this._loginService.login(usuario, clave).subscribe(res=>{
      if(res == true)
      {
        this._router.navigate(['home-ponente']);
      }
    });
  }

  public irFormulario(id:number, nombre:string, anio:string)
  {
    this._router.navigate(['nuevo-asistente-form', id, nombre, anio]);
  }

}


