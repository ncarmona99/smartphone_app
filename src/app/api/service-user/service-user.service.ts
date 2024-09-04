import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiceUserService {

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

  encontrar_usuario(user: User) : PerfilUsuario {
    //Se recorre la lista de usuarios hasta que el usuario y password coincidan
    for (let i = 0; i < this.lista_usuarios.length; i++){
      if (this.lista_usuarios[i].user.usuario == user.usuario && this.lista_usuarios[i].user.password == user.password) {
        //Se retorna el usuario de tipo PerfilUsuario con todos sus atributos
        return this.lista_usuarios[i];
      }
    }
    //Se retorna un usuario de tipo PerfilUsuario con todos sus atributos vacíos
    return this.perfilUsuario;
  }
 
  
}
