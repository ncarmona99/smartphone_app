import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/api/service-user/service-user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuario: User= {
    usuario: "",
    password: ""
  }

  constructor(private _login: ServiceUserService, private router: Router) { }

  ngOnInit() {
  }

  login(user: User) {
    this.usuario = this._login.encontrar_usuario(user);
    if (user.usuario.length > 0 && user.password.length >0) {
      console.info("el usuario existe")
      console.info(this.usuario)
      this.router.navigate(['home'], {
      state: {
      user: this.usuario
      }
      })
    } else {
      console.error("el usuario no existe")
    }
  }
}
