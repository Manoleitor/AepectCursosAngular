import { LoginRQ } from './../clases/loginRQ';
import { LoginRS } from './../clases/loginRS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, from, empty, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) { }

  public login(usuario: string, clave: string): Observable<Boolean> {
    const RQ: LoginRQ = {
      usuario: usuario,
      clave: clave
    }
    return this._httpClient.post('http://localhost:8012/AepectApiRest/login.php', {
      RQ
    }).pipe(map((res: LoginRS) => {
      if (res.error == 'Exito') {
        return true;
      } else {
        return false;
      }
    }),
      catchError((err, caught) => {
        console.log(err);
        let s: Subject<Boolean> = new Subject;
        s.next(false);
        return s;
      })
    );
  }
}
