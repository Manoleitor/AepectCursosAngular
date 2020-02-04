import { createAsistenteRS } from './../../clases/createAsistenteRS';
import { CursosService } from './../../services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asistente } from 'src/app/clases/asistente';
import { createAsistenteRQ } from 'src/app/clases/createAsistenteRQ';

@Component({
  selector: 'app-nuevo-asistente-form',
  templateUrl: './nuevo-asistente-form.component.html',
  styleUrls: ['./nuevo-asistente-form.component.css']
})
export class NuevoAsistenteFormComponent implements OnInit {

  public mensaje:string;
  public id:number;
  public nombreCurso:string;
  public anio:string;

  public mostrarMensajeExito:boolean = false;
  public mostrarMensajeFrasaco:Boolean = false;
  
  constructor(private _activatedRoute: ActivatedRoute,
    private _cursosService: CursosService) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params["id"];
    this.nombreCurso = this._activatedRoute.snapshot.params["nombre"];
    this.anio = this._activatedRoute.snapshot.params["anio"];

    this.mostrarMensajeExito = this.mostrarMensajeFrasaco = false;
  }

  public apuntarse(
    nombre:string,
    apellidos:string,
    email:string,
    emailRepetido:string,
    dni:string,
    pasaporte:string,
    socio:number)
  {

    if (email != emailRepetido)
    {
      this.mensaje = "Los correos electrónicos no coinciden";
    }else if (dni == undefined && pasaporte == undefined)
    {
      this.mensaje = "Se debe inicar un DNI o un pasaporte";
    }else{
      const asistente:asistente = {
        nombre:nombre,
        apellidos:apellidos,
        email:email,
        dni:dni,
        pasaporte:pasaporte,
        socio:socio,
        idCurso:this.id
      };

      const RQ:createAsistenteRQ = {
        asistente:asistente
      }

      this._cursosService.postAsistente(RQ).subscribe(res => {

        if(res.error == "Exito")
        {
          this.mostrarMensajeExito = true;
        }
        else{
          this.mostrarMensajeFrasaco = true;
        } 
      });

    }
  }
}
