import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Response } from '@angular/http';
import { Curso } from '../clases/curso';
import { Observable, of, from } from 'rxjs';
import { listaCursosRS } from '../clases/listaCursosRS';
import { map } from 'rxjs/operators';
import { readCursosRQ } from '../clases/readCursosRQ';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private _httpClient: HttpClient) { }

  // public getCursosListEntrada(): Observable<Array<Curso>> {
  //   return Observable.create((observer: Observable) => {
  //     this._httpClient.get('http://localhost:8012/AepectApiRest/cursos/getCursosList.php')
  //       .subscribe((res: listaCursosRS) => {
  //         observer.next(res.cursos);
  //         observer.complete();
  //       }, err => observer.error(err))
  //   })
  // }

  public getCursosListEntrada(): Observable<Array<Curso>> {
    return this._httpClient.get('http://localhost:8012/AepectApiRest/cursos/getCursosList.php').pipe(
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
    return this._httpClient.post('http://localhost:8012/AepectApiRest/cursos/readCursos.php',
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

}
