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
    //Se obtiene el usuario enviado al navegar desde página login hacia home con la función login()
    this.user = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
    console.info(this.user);
  }

  verPerfil(){
    //Se redirecciona a la página perfil-usuario enviando el usuario
    this.router.navigate(['perfil-usuario'], {
      state: {
        usuario: this.user
      }
    })

  }

}
