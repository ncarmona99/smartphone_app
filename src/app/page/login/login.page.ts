import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceUserService } from 'src/app/api/service-user/service-user.service';
import { AuthService } from 'src/app/auth.service';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { User } from 'src/app/models/user';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  perfilUsuario: PerfilUsuario = {
    user: {
      usuario: '',
      password: '',
      pass: '',
    },
    rol: {
      id: 0,
      nombre: '',
    },
    nombre: '',
    apellido: '',
    correo: '',
    telefono: 0,
  };

  user: User = {
    usuario: '',
    password: '',
    pass: '',
  };

  constructor(
    private _userService: ServiceUserService,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  //función para limpiar los campos
  limpiar() {
    this.user.password = '';
    this.user.usuario = '';
  }

  //La función recibe el user (usuario y password) como parámetro desde el html
  async login(user: User) {
    //Se encripta la contraseña
    const hashedPassword = this.authService.encryptPassword(user.password);
    console.log('Contraseña encriptada:', hashedPassword);
    user.password = hashedPassword;
    //La función retorna el usuario de tipo PerfilUsuario encontrado o uno con atributos vacíos en caso de no existir.
    this.perfilUsuario = this._userService.encontrar_usuario(user);
    if (
      this.perfilUsuario.user.usuario.length > 0 &&
      this.perfilUsuario.user.password.length > 0
    ) {
      console.info('el usuario existe');
      console.info(this.perfilUsuario);
      //Se redirecciona a la página home enviando el usuario de tipo PerfilUsuario con todos sus atributos
      this.limpiar();
      this.router.navigate(['home'], {
        state: {
          user: this.perfilUsuario,
        },
      });
    } else {
      this.limpiar();
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'El nombre de usuario o la contraseña son incorrectos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      console.error('el usuario no existe');
    }
  }
  IrRegistro() {
    //Se redirecciona a la página perfil-usuario enviando el usuario
    this.router.navigate(['registro']);
  }
}
