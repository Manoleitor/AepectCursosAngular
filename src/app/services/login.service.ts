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
    return this._httpClient.post('http://localhost:8012/AepectApiRest/login.php', {
      RQ
    }).pipe(map((res: LoginRS) => {
      if (res.error == 'Exito') {
        this._storeDataService.changeName(usuario);
        this._storeDataService.changeToken(res.token);
        return true;
      } else {
        this._storeDataService.changeName('');
        this._storeDataService.changeToken('');
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
