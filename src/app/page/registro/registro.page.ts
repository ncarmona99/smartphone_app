import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { ServiceUserService } from 'src/app/api/service-user/service-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  perfilUsuario: PerfilUsuario= {
    user: {
      usuario: "",
      password: ""
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

  constructor(private authService: AuthService, private _userService: ServiceUserService, private router: Router) { }

  ngOnInit() {
  }

  registrar(perfilUsuario: PerfilUsuario){
    //Se encripta la contraseña
    const hashedPassword = this.authService.encryptPassword(perfilUsuario.user.password);
    console.log('Contraseña encriptada:', hashedPassword);
    //Se asigna la contraseña encriptada el usuario de tipo PerfilUsuario
    perfilUsuario.user.password = hashedPassword;
    //Se agrega el usuario a la lista de usuarios
    this._userService.agregar_usuario(perfilUsuario);
    this.router.navigate(['login'])

  }


}
