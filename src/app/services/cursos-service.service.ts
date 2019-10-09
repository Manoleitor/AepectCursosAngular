import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Response } from '@angular/http';
import { Curso } from '../clases/curso';
import { Observable, of, from } from 'rxjs';
import { listaCursosRS } from '../clases/listaCursosRS';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CursosServiceService {

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

}
