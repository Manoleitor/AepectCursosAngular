import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nav-bar-ponente',
  templateUrl: './nav-bar-ponente.component.html',
  styleUrls: ['./nav-bar-ponente.component.css']
})
export class NavBarPonenteComponent implements OnInit {
  public usuario: string;

  constructor(private _router: Router,
    private _location: Location,
    private _loginService: LoginService) {     
     }

  ngOnInit() {
    this.usuario = localStorage.getItem('usuario');
    if (this.usuario == null)
    {
      this.goHome();
    }
  }

  public exit()
  {
    this._loginService.logout(localStorage.getItem('token')).subscribe();
    this.goHome();
  }

  private goHome()
  {
    this._location.replaceState('/');
    this._router.navigate(['home']);
  }

}
