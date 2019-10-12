import { Component, OnInit } from '@angular/core';
import { StoreDataService } from './../../services/store-data.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar-ponente',
  templateUrl: './nav-bar-ponente.component.html',
  styleUrls: ['./nav-bar-ponente.component.css']
})
export class NavBarPonenteComponent implements OnInit {
  public usuario: string;

  constructor(private _storeDataService: StoreDataService,
    private _router: Router,
    private _location: Location) {     
     }

  ngOnInit() {
    this.usuario = 'nombre';
    this._storeDataService.storeName.subscribe(u =>
      {
        if (u != '')
        {
          this.usuario = u;
        }
        else{
          this._location.replaceState['/'];
          this._router.navigate['home'];
        }
      });
  }

}
