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

  private mensaje:string;
  private id:number;
  private nombreCurso:string;
  private anio:string;

  private mostrarMensajeExito:boolean = false;
  private mostrarMensajeFrasaco:Boolean = false;
  
  asistente:asistente;

  mostrarTransporte:boolean=true;

  constructor(private _activatedRoute: ActivatedRoute,
    private _cursosService: CursosService) { }

  ngOnInit() {
    this.asistente = new asistente();
    
    this.id = this._activatedRoute.snapshot.params["id"];
    this.asistente.idCurso = this.id;
    this.nombreCurso = this._activatedRoute.snapshot.params["nombre"];
    this.anio = this._activatedRoute.snapshot.params["anio"];

    this.mostrarMensajeExito = false;
    
    this.mostrarMensajeFrasaco = false;
  }

  public apuntarse(
    asistente:asistente,
    email:string,
    emailRepetido:string,
    dni:string,
    pasaporte:string,
    )
  {
    if (email != emailRepetido)
    {
      this.mensaje = "Los correos electrónicos no coinciden";
    }else if (dni == undefined && pasaporte == undefined)
    {
      this.mensaje = "Se debe inicar un DNI o un pasaporte";
    }else{

      const RQ:createAsistenteRQ = {
        asistente:asistente
      }

      if(asistente.pasaporte == undefined)
      {
        asistente.pasaporte = "";
      }

      if (asistente.dni == undefined)
      {
        asistente.dni == "";
      }

      this._cursosService.postAsistente(RQ).subscribe(res => {

        if(res.error == "Exito")
        {
          this.mostrarMensajeExito = true;
        }
        else{
          console.log(res.error);
          this.mostrarMensajeFrasaco = true;
        } 
      },
      error=>{this.mostrarMensajeFrasaco = true;
      console.log(error);}
      );

    }
  }

  rellenarDatosPrueba()
  {
    this.asistente = {
      idCurso:this.id,
      socio:0,
      nombre:"Jose",
      apellidos:"JJ",
      email:"email@e.ni",
      dni:"22222222A",
      codigo_pais:"34",
      movil:"666333999"
    }
  }
}
