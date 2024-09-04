import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/api/service-user/service-user.service';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  perfilUsuario: PerfilUsuario= {
    user: {
      usuario: "",
      password: ""
    },
    rol: {
      id: 0,
      nombre: ""
    },
    nombre: "",
    apellido: "",
    correo: "",
    telefono: 0    
  }

  constructor(private _login: ServiceUserService, private router: Router) { }

  ngOnInit() {
  }

  //La función recibe el user (usuario y password) como parámetro desde el html
  login(user: User) {
    //La función retorna el usuario de tipo PerfilUsuario encontrado o uno con atributos vacíos en caso de no existir.
    this.perfilUsuario = this._login.encontrar_usuario(user);
    if (user.usuario.length > 0 && user.password.length >0) {
      console.info("el usuario existe")
      console.info(this.perfilUsuario)
      //Se redirecciona a la página home enviando el usuario de tipo PerfilUsuario con todos sus atributos
      this.router.navigate(['home'], {
      state: {
      user: this.perfilUsuario
      }
      })
    } else {
      console.error("el usuario no existe")
    }
  }
}
