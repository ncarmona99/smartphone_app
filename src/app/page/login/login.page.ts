import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/api/service-user/service-user.service';
import { AuthService } from 'src/app/auth.service';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  perfilUsuario: PerfilUsuario = {
    user: {
      usuario: "",
      password: "",
      pass: "",
    },
    rol: {
      id: 0,
      nombre: ""
    },
    nombre: "",
    apellido: "",
    correo: "",
    telefono: ""
  }

  user: User = {
    usuario: "",
    password: "",
    pass: ""
  }

  constructor(private _userService: ServiceUserService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  //función para limpiar los campos
  limpiar() {
    this.perfilUsuario.user.password = "";
    this.perfilUsuario.user.usuario = "";
  }

  //La función recibe el user (usuario y password) como parámetro desde el html
  login(user: User) {
    //Se encripta la contraseña
    const hashedPassword = this.authService.encryptPassword(user.password);
    console.log('Contraseña encriptada:', hashedPassword);
    user.password = hashedPassword;
    //La función retorna el usuario de tipo PerfilUsuario encontrado o uno con atributos vacíos en caso de no existir.
    this.perfilUsuario = this._userService.encontrar_usuario(user);
    if (this.perfilUsuario.user.usuario.length > 0 && this.perfilUsuario.user.password.length > 0) {
      console.info("el usuario existe");
      console.info(this.perfilUsuario);
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

  IrRegistro() {
    this.router.navigate(['registro'])
  }

}
