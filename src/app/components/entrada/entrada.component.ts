import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Curso} from '../../clases/curso';
import { CursosServiceService} from '../../services/cursos-service.service';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  private cursos: Array<Curso>;

  constructor(private _cursosServiceService : CursosServiceService,
    private _loginService: LoginService) { }

  ngOnInit() {
    this._cursosServiceService.getCursosListEntrada().subscribe(res=>{
      this.cursos = res;
    });
  }

  public login(usuario:string, clave: string)
  {
    this._loginService.login(usuario, clave).subscribe(res=>{
      
    });
  }

}


