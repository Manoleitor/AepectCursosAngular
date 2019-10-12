import { StoreDataService } from './../../services/store-data.service';
import { Curso } from './../../clases/curso';
import { CursosServiceService } from './../../services/cursos-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-home-ponente',
  templateUrl: './home-ponente.component.html',
  styleUrls: ['./home-ponente.component.css']
})
export class HomePonenteComponent implements OnInit {

  private token: string;


  constructor(private _cursosServiceService: CursosServiceService,
    private _storeDataService: StoreDataService,
    private _router: Router,
    private _location: Location) {
    this._storeDataService.storeToken.subscribe( t => {
      if (t != '')
      {
        this.token = t;
      }else{
        this.exit();
      }
    });
    }  

  ngOnInit() {    
  }

  private exit()
  {
    this._location.replaceState['/'];
    this._router.navigate['home'];
  }

}
