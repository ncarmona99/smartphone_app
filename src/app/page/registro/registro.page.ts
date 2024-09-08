import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { ServiceUserService } from 'src/app/api/service-user/service-user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  perfilUsuario: PerfilUsuario= {
    user: {
      usuario: "",
      password: "",
      pass: ""
    },
    rol: {
      id: 2,
      nombre: "Invitado" //El registro por defecto crea usuarios con rol invitado
    },
    nombre: "",
    apellido: "",
    correo: "",
    telefono: 0   
  }

  constructor(private authService: AuthService, private _userService: ServiceUserService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    if (this.perfilUsuario.telefono === 0) {
      this.perfilUsuario.telefono = null;
  }}

  limpiar(){
    this.perfilUsuario.nombre = "";
    this.perfilUsuario.apellido = "";
    this.perfilUsuario.correo = "";
    this.perfilUsuario.telefono = null;
    this.perfilUsuario.user.pass = "";
    this.perfilUsuario.user.password = "";
    this.perfilUsuario.user.usuario = "";
  }

  async registrar(perfilUsuario: PerfilUsuario){
    if (perfilUsuario.user.usuario === "" || perfilUsuario.user.password === "" || perfilUsuario.user.pass === ""
        || perfilUsuario.nombre === "" || perfilUsuario.apellido === "" || perfilUsuario.telefono == null
        || perfilUsuario.correo === ""){
      console.log("No pueden haber campos vacíos");
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'No pueden haber campos vacíos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (perfilUsuario.user.usuario.length > 20){
      console.log("Nombre de usuario es demaisado largo (máximo de 20 caracteres)");
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Nombre de usuario es demaisado largo (máximo de 20 caracteres)',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
    else if (perfilUsuario.user.usuario.length < 4){
      console.log("Nombre de usuario es demaisado corto (mínimo de 4 caracteres)");
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Nombre de usuario es demaisado corto (mínimo de 4 caracteres)',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
    }
    else if (perfilUsuario.user.password != perfilUsuario.user.pass){
      console.log("Las contaseñas no coinciden. Ingresar nuevamente");
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'Las contaseñas no coinciden. Ingresar nuevamente',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
    }
    else if (perfilUsuario.correo.includes('@') == false || perfilUsuario.correo.includes('.') == false || /[a-zA-Z]/.test(perfilUsuario.correo) == false){
      console.log("El correo electrónico no es válido. Ingrese nuevamente");
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'El correo electrónico no es válido. Ingrese nuevamente',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
    }
    else if (perfilUsuario.telefono.toString().length != 9){
      console.log("El teléfono debe contener 9 dígitos");
      const alert = await this.alertController.create({
        header: 'ERROR',
        message: 'El teléfono debe contener 9 dígitos',
        buttons: ['Aceptar'],
      });
  
      await alert.present();
    }
    else{
      //Se encripta la contraseña
      const hashedPassword = this.authService.encryptPassword(perfilUsuario.user.password);
      console.log('Contraseña encriptada:', hashedPassword);
      //Se asigna la contraseña encriptada el usuario de tipo PerfilUsuario
      perfilUsuario.user.password = hashedPassword;
      //Se agrega el usuario a la lista de usuarios
      this._userService.agregar_usuario(perfilUsuario);
      this.limpiar();
      this.router.navigate(['login'])
    }

  }


}
