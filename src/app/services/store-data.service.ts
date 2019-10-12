import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreDataService {

  storeName: Subject<any> = new Subject<any>();
  storeToken: Subject<any> = new Subject<any>()

  constructor() { 
    this.storeToken.next('');
    this.storeName.next('');
  }

  public changeName(name: string)
  {
    this.storeName.next(name);
  }

  public changeToken(token: string)
  {
    this.storeToken.next(token);
  }
}
