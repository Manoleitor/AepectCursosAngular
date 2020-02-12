import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from './../../clases/curso';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { asistente } from 'src/app/clases/asistente';
import "snapsvg-cjs";
import { getAsistenteRQ } from 'src/app/clases/getAsistenteRQ';
import { createAsistenteRQ } from 'src/app/clases/createAsistenteRQ';
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
  private idAsistenteEditar:number;


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

    this.idAsistenteEditar = -1;
  }

  private goHome() {
    this._location.replaceState('/');
    this._router.navigate(['home']);
  }

  tienePlaza(plaza:number)
  {  
    if (this.curso[0].maximos_participantes != undefined)
    {
      return this.curso[0].maximos_participantes > plaza  ? true : false;
    }

    return true; // si no hay numero fijo máximo de plazas devolver siempre verdadero
  }

  irEditandoAsistente(id:number)
  {
    this.idAsistenteEditar=id;
  }

  editandoEsteAsistente(id:number)
  {
    return id == this.idAsistenteEditar;
  }


  editandoRegistro()
  {
    return this.idAsistenteEditar == -1;
  }

  guardarAsistente(a:asistente)
  {
   
    const RQ:updateAsistenteRQ = {
      token:this.token,
      asistente:a
    }
    this._cursosService.updateAsistente(RQ).subscribe(res => {      
      if(res.error == "exito")
      {
        const asistenteRQ:getAsistenteRQ = {
          token:this.token,
          id:a.id
        };
        this._cursosService.getAsistente(asistenteRQ).subscribe(res=> this.asistentes[id]= res);
      }
      this.idAsistenteEditar= -1;
    }
    );

    
  }

  eliminarAsistente(a:asistente, index:number)
  {
    if (confirm("¿Seguro que quieres quitar a " + a.nombre + " " + a.apellidos + "?"))
    {
      const RQ:deleteAsistenteRQ= {
        id:a.id,
        token:this.token};
      
        this._cursosService.deleteAsistente(RQ).subscribe(res =>{
          if(res.error == "Exito")
          {
            this.asistentes.splice(index,1);
          }else{
  
          }
        })
    }    
  }

}

