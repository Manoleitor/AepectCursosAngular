import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from './../../clases/curso';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { asistente } from 'src/app/clases/asistente';
import "snapsvg-cjs";
import { getAsistenteRQ } from 'src/app/clases/getAsistenteRQ';
import { updateAsistenteRQ } from 'src/app/clases/updateAsistenteRQ';
import { deleteAsistenteRQ } from 'src/app/clases/deleteAsistenteRQ';

@Component({
  selector: 'app-edicion-curso',
  templateUrl: './edicion-curso.component.html',
  styleUrls: ['./edicion-curso.component.css']
})
export class EdicionCursoComponent implements OnInit {

  private token: string;
  private id: number;
  private curso: Curso;
  private asistentes: Array<asistente>;
  private idAsistenteEditar: number;
  private listaEmails: string = "";
  private listaAdmitidosCoche: string = "";
  private listaAdmitidosBus: string = "";
  private listaNoAdmitidosCoche: string = "";
  private listaNoAdmitidosBus: string = "";
  private listaAdmitidosSimple: string="";
  private listaNoAdmitidosSimple:string="";
  private listaAdmitidosDoble:string="";
  private listaNoAdmitidosDoble:string="";
  private listaAdmitidosIndiferente:string="";
  private listaNoAdmitidosIndiferente:string="";


  private tmpAsistente:asistente;


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
      if (this.curso.asistentes != undefined) {
        this.asistentes = this.curso.asistentes;
        this.rellenarListaEmails();
        this.rellenarListasCocheYBus();
      }
    }
    );

    this.idAsistenteEditar = -1;
  }

  cancelarEdicion()
  {
    this.asistentes[this.idAsistenteEditar] = this.tmpAsistente;
    this.idAsistenteEditar = -1;
  }

  editandoEsteAsistente(id: number) {
    return id == this.idAsistenteEditar;
  }

  editandoRegistro() {
    return this.idAsistenteEditar == -1;
  }

  eliminarAsistente(a: asistente, index: number) {
    if (confirm("¿Seguro que quieres quitar a " + a.nombre + " " + a.apellidos + "?")) {
      const RQ: deleteAsistenteRQ = {
        id: a.id,
        token: this.token
      };

      this._cursosService.deleteAsistente(RQ).subscribe(res => {
        if (res.error == "Exito") {
          this.asistentes.splice(index, 1);
          this.rellenarListaEmails();
          this.rellenarListasCocheYBus();
        } else {

        }
      }, error => {

        this.mensajeError();
      }
      )
    }
  }

  goHome() {
    this._location.replaceState('/');
    this._router.navigate(['home']);
  }

  guardarAsistente(a: asistente) {

    this.rellenarListaEmails();
    this.rellenarListasCocheYBus();

    const RQ: updateAsistenteRQ = {
      token: this.token,
      asistente: a
    }
    this._cursosService.updateAsistente(RQ).subscribe(res => {
      if (res.error == "Exito") {
        const asistenteRQ: getAsistenteRQ = {
          token: this.token,
          id: a.id
        };
        this._cursosService.getAsistente(asistenteRQ).subscribe(res => {
          if (JSON.stringify(a).toUpperCase() !== JSON.stringify(res).toUpperCase())
          {            
            this.mensajeError();
          }
        }, error => {
          console.log(error);
          this.mensajeError();
        });
      }
      this.idAsistenteEditar = -1;
    }, error => {
      console.log(error);
      this.mensajeError();
    }
    );
  }

  irEditandoAsistente(id: number) {
    this.idAsistenteEditar = id;
    this.tmpAsistente = JSON.parse(JSON.stringify(this.asistentes[id]));
  }

  mensajeError() {
    if (confirm("Ha ocurrido un error ¿desea recargar la página?")) {
      window.location.reload();
    }
  }


  rellenarListasCocheYBus() {
    this.listaAdmitidosCoche = "";
    this.listaAdmitidosBus = "";
    this.listaNoAdmitidosCoche = "";
    this.listaNoAdmitidosBus = "";
    this.listaAdmitidosDoble="";
    this.listaAdmitidosSimple="";
    this.listaAdmitidosIndiferente="";
    let tpmListaAdmitidos: string[] = [];
    let tmpListaAdmitidosBus: string[] = [];
    let tpmListaNoAdmitidosCoche: string[] = [];
    let tmpListaNoAdmitidosBus: string[] = [];
    let tmplistaAdmitidosSimple:string[] = [];
    let tmplistaAdmitidosDoble:string[] = [];
    let tmplistaAdmitidosIndiferente:string[] = [];
    let tmplistaNoAdmitidosSimple:string[] = [];
    let tmplistaNoAdmitidosDoble:string[] = [];
    let tmplistaNoAdmitidosIndiferente:string[] = [];

    let plaza: number = 0;

    this.asistentes.forEach(asistente => {

      let tmpNombre:string = asistente.nombre + " " + asistente.apellidos;

      if (this.tienePlaza(plaza)) {  
        if (asistente.transporte != undefined && asistente.transporte == "Coche")
        {
          tpmListaAdmitidos.push(tmpNombre);
        }
        if(asistente.transporte != undefined && asistente.transporte == "Bus")
        {
          tmpListaAdmitidosBus.push(tmpNombre);
        }
        if(asistente.habitacion != undefined && asistente.habitacion == "Simple")
        {
          tmplistaAdmitidosSimple.push(tmpNombre);
        }else if(asistente.habitacion != undefined && asistente.habitacion == "Doble")
        {
          tmplistaAdmitidosDoble.push(tmpNombre);
        }else if(asistente.habitacion != undefined && asistente.habitacion == "Indiferente")
        {
          tmplistaAdmitidosIndiferente.push(tmpNombre);
        }

        
      }else{
        if (asistente.transporte != undefined && asistente.transporte == "Coche")
        {
          tpmListaNoAdmitidosCoche.push(tmpNombre);
        }
        if(asistente.transporte != undefined && asistente.transporte == "Bus")
        {
          tmpListaNoAdmitidosBus.push(tmpNombre);
        }

        if(asistente.habitacion != undefined && asistente.habitacion == "Simple")
        {
          tmplistaNoAdmitidosSimple.push(tmpNombre);
        }else if(asistente.habitacion != undefined && asistente.habitacion == "Doble")
        {
          tmplistaNoAdmitidosDoble.push(tmpNombre);
        }else if(asistente.habitacion != undefined && asistente.habitacion == "Indiferente")
        {
          tmplistaNoAdmitidosIndiferente.push(tmpNombre);
        }

      }
      plaza = plaza + 1;
    });

    this.listaAdmitidosCoche = tpmListaAdmitidos.join(", ");
    this.listaAdmitidosBus = tmpListaAdmitidosBus.join(", ");
    this.listaNoAdmitidosCoche = tpmListaNoAdmitidosCoche.join(", ");
    this.listaNoAdmitidosBus = tmpListaNoAdmitidosBus.join(", ");
    this.listaAdmitidosSimple = tmplistaAdmitidosSimple.join(", ");
    this.listaAdmitidosDoble = tmplistaAdmitidosDoble.join(", ");
    this.listaAdmitidosIndiferente = tmplistaAdmitidosIndiferente.join(", ");
    this.listaNoAdmitidosDoble = tmplistaNoAdmitidosDoble.join(", ");
    this.listaNoAdmitidosSimple = tmplistaNoAdmitidosSimple.join(", ");
    this.listaNoAdmitidosIndiferente = tmplistaNoAdmitidosIndiferente.join(", ");
  }

  rellenarListaEmails() {
    this.listaEmails = "";
    let tmpEmails: string[] = [];
    this.asistentes.forEach(asistente => tmpEmails.push(asistente.email));
    this.listaEmails = tmpEmails.join(", ");
  }

  tienePlaza(plaza: number) {
    if (this.curso[0].maximos_participantes != undefined) {
      return this.curso[0].maximos_participantes > plaza ? true : false;
    }
    return true; // si no hay numero fijo máximo de plazas devolver siempre verdadero
  }



}

