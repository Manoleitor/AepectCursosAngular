import { StoreDataService } from './store-data.service';
import { LoginRQ } from './../clases/loginRQ';
import { LoginRS } from './../clases/loginRS';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient,
    private _storeDataService: StoreDataService) { }

  public login(usuario: string, clave: string): Observable<Boolean> {
    const RQ: LoginRQ = {
      usuario: usuario,
      clave: clave
    }
    return this._httpClient.post('AepectApiRest/login.php', {
      RQ
    }).pipe(map((res: LoginRS) => {
      if (res.error == 'Exito') {
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('token', res.token);
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

  public logout(token:string): Observable<Boolean> {
    return this._httpClient.post('AepectApiRest/logout.php', {
      token
    }).pipe(map((error: any) => {
      if (error == 'Exito') {
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
