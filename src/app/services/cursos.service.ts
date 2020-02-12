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
import { getAsistenteRQ } from '../clases/getAsistenteRQ';
import { getAsistenteRS } from '../clases/getAsistenteRS';
import { updateAsistenteRQ } from '../clases/updateAsistenteRQ';
import { updateAsistenteRS } from '../clases/updateAsistenteRS';
import { deleteAsistenteRQ } from '../clases/deleteAsistenteRQ';
import { deleteAsistenteRS } from '../clases/deleteAsistenteRS';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private _httpClient: HttpClient) { }

  public getCursosListEntrada(): Observable<Array<Curso>> {
    return this._httpClient.get('AepectApiRest/cursos/getCursosList.php').pipe(
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
    return this._httpClient.post('AepectApiRest/cursos/readCursos.php',
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
    return this._httpClient.post('AepectApiRest/cursos/getCurso.php',
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

  public postAsistente(RQ:createAsistenteRQ):Observable<createAsistenteRS>{
    return this._httpClient.post('AepectApiRest/asistentes/createAsistente.php',
    {
      RQ
    }).pipe(map((res: createAsistenteRS) =>{
      return res;
    }));
  }

  public updateAsistente(RQ:updateAsistenteRQ):Observable<updateAsistenteRS>{
    return this._httpClient.post('AepectApiRest/asistentes/updateAsistente.php',
    {
      RQ
    }).pipe(map((res: createAsistenteRS) =>{
      return res;
    }));
  }

  public getAsistente(RQ:getAsistenteRQ):Observable<asistente>{
    return this._httpClient.post('AepectApiRest/asistentes/readAsistente.php', {
      RQ
    }).pipe(map((res: getAsistenteRS) =>{
      if (res.error=="Exito")
      {
        return res.asistente;
      }else{
        return undefined;
      }
    }));
  }

  public deleteAsistente(RQ:deleteAsistenteRQ):Observable<deleteAsistenteRS>{
    return this._httpClient.post('AepectApiRest/asistentes/deleteAsistente.php', {
      RQ
    }).pipe(map((res: deleteAsistenteRS) =>{
      return res;
    }));
  }

}
