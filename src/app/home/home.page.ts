import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user!: User;

  constructor(private router : Router) {}

  ngOnInit() {
    this.user = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
  }

  verPerfil(){
    this.router.navigate(['perfil-usuario'], {
      state: {
        usuario: this.user
      }
    })

  }

}
