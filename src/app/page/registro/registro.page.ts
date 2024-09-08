import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { ServiceUserService } from 'src/app/api/service-user/service-user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ErrorPerfilUsuario } from 'src/app/models/error-perfil-usuario';

@Injectable({
  providedIn: 'root',
})

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
    telefono: "", 
  }

  error: ErrorPerfilUsuario = {};

  constructor(private authService: AuthService, private _userService: ServiceUserService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    this.limpiar();
  }

  limpiar(){
    this.perfilUsuario.nombre = "";
    this.perfilUsuario.apellido = "";
    this.perfilUsuario.correo = "";
    this.perfilUsuario.telefono = "";
    this.perfilUsuario.user.pass = "";
    this.perfilUsuario.user.password = "";
    this.perfilUsuario.user.usuario = "";
  }

  //Se crea el popup de error para la validación de campos
  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  validarPerfilUsuario = (perfilUsuario: PerfilUsuario): ErrorPerfilUsuario => {
    
    // Verifica campos vacíos
    if (Object.values(perfilUsuario.user).some(field => field === "") ||
        Object.values(perfilUsuario).some(field => field === null || field === "")) {
      this.error.general = "No pueden haber campos vacíos";
    }
  
    // Verifica longitud del nombre de usuario
    if (perfilUsuario.user.usuario.length > 20) {
      this.error.usuario = "Nombre de usuario es demasiado largo (máximo de 20 caracteres)";
    } else if (perfilUsuario.user.usuario.length < 4) {
      this.error.usuario = "Nombre de usuario es demasiado corto (mínimo de 4 caracteres)";
    }
    if (perfilUsuario.nombre === "") {
      this.error.nombre = "Ingrese su nombre"
    }
    if (perfilUsuario.apellido === "") {
      this.error.apellido = "Ingrese su apellido"
    }  
    // Verifica coincidencia de contraseñas
    if (perfilUsuario.user.password !== perfilUsuario.user.pass) {
      this.error.password = "Las contraseñas no coinciden. Ingréselas nuevamente";
    }  
    // Verifica formato del correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfilUsuario.correo)) {
      this.error.correo = "El correo electrónico no es válido. Ingrese su correo nuevamente";
    }  
    // Verifica que el teléfono contenga solo caracteres numéricos y tenga exactamente 9 dígitos
    if (perfilUsuario.telefono.length !== 9) {
      this.error.telefono = "El teléfono debe contener 9 dígitos";
    }
  
    return this.error;
  };

  registrar() {
    // Actualiza errores
    this.error = this.validarPerfilUsuario(this.perfilUsuario);

    if (Object.keys(this.error).length > 0) {
      console.log("Errores encontrados:", this.error);
      this.showAlert('ERROR', 'Por favor, corrige los errores antes de continuar.');
      return;
    }

    // Encripta la contraseña
    const hashedPassword = this.authService.encryptPassword(this.perfilUsuario.user.password);
    console.log('Contraseña encriptada:', hashedPassword);
    this.perfilUsuario.user.password = hashedPassword;
    
    // Agrega el usuario a la lista de usuarios
    this._userService.agregar_usuario(this.perfilUsuario);
    this.router.navigate(['login']);
  }

}
