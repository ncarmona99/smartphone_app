import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {

  constructor() { }

  private lista_usuarios:PerfilUsuario[] = [

    {
      "user": {
        "usuario": "juana_perez",
        "password": "Juana123"
      },
      "rol": {
        "id": 1,
        "nombre": "Admin"
      },
      "nombre": "Juana",
      "apellido": "Pérez",
      "correo": "juanaperez@mail.com",
      "telefono": 987654321
    },
    {
      "user": {
        "usuario": "pedro_lopez",
        "password": "Pedro123"
      },
      "rol": {
        "id": 2,
        "nombre": "Invitado"
      },
      "nombre": "Pedro",
      "apellido": "López",
      "correo": "pedrolopez@mail.com",
      "telefono": 912345678
    },
    {
      "user": {
        "usuario": "luisa_silva",
        "password": "Luisa123"
      },
      "rol": {
        "id": 2,
        "nombre": "Invitado"
      },
      "nombre": "Luisa",
      "apellido": "Silva",
      "correo": "luisasilva@mail.com",
      "telefono": 998765432
    },

  ]

  encontrar_usuario(user: User) : User {
    for (let i = 0; i < this.lista_usuarios.length; i++){
      if (this.lista_usuarios[i].user.usuario == user.usuario && this.lista_usuarios[i].user.password == user.password) {
        return this.lista_usuarios[i].user;
      }
    } 
    user.usuario = "";
    user.password = "";
    return user;
  }
 
  
}
