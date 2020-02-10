import { asistente } from './../clases/asistente';
import { createAsistenteRS } from './../clases/createAsistenteRS';
import { createAsistenteRQ } from './../clases/createAsistenteRQ';
import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Response } from '@angular/http';
import { Curso } from '../clases/curso';
import { Observable, of, from } from 'rxjs';
import { listaCursosRS } from '../clases/listaCursosRS';
import { map } from 'rxjs/operators';
import { readCursosRQ } from '../clases/readCursosRQ';
import { getCursoRQ } from '../clases/getCursoRQ';
import { getCursoRS } from '../clases/getCursoRS';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private _httpClient: HttpClient) { }

  public getCursosListEntrada(): Observable<Array<Curso>> {
    return this._httpClient.get('http://AepectApiRest/cursos/getCursosList.php').pipe(
      map((res: listaCursosRS) => {
        return res.cursos;
      })
    ); 
  }

  public getCursosPonente(token:string): Observable<Array<Curso>>
  {
    const RQ: readCursosRQ = {
      token: token
    }
    return this._httpClient.post('http://AepectApiRest/cursos/readCursos.php',
    {
      RQ
    }).pipe(map((res: listaCursosRS) =>{
      if (res.error=="Exito")
      {
        return res.cursos;
      }else{
        return [];
      }
    }));
  }

  public getCurso(token:string, id:number): Observable<Curso>
  {
    const RQ: getCursoRQ = {
      token: token,
      id: id
    }
    return this._httpClient.post('http://AepectApiRest/cursos/getCurso.php',
    {
      RQ
    }).pipe(map((res: getCursoRS) =>{
      if (res.error=="Exito")
      {
        return res.curso;
      }else{
        return undefined;
      }
    }));
  }

  public postAsistente(createAsistenteRQ:createAsistenteRQ):Observable<createAsistenteRS>{
    let asistente = createAsistenteRQ.asistente;

    return this._httpClient.post('http://AepectApiRest/asistentes/createAsistente.php',
    {
      asistente
    }).pipe(map((res: createAsistenteRS) =>{
      return res;
    }));
  }

}
