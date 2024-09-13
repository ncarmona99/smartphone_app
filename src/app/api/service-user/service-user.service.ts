import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';

@Injectable({
  providedIn: 'root',
})
export class ServiceUserService {
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

  constructor() {}

  private lista_usuarios: PerfilUsuario[] = [
    {
      user: {
        usuario: 'admin',
        password:
          '45e3f8c81a7d488c09c9396ace095c0b4b3a372fa4959e6af58d3a9b9d56b591',
        pass: '',
        //password: admin
      },
      rol: {
        id: 1,
        nombre: 'Admin',
      },
      nombre: 'Admin',
      apellido: 'Admin',
      correo: 'admin@mail.com',
      telefono: 947725774,
    },
    {
      user: {
        usuario: 'nico',
        password:
          '470f7bc761d72029a491ecca22c75e71fb35b038ca562fa8312d2dc0ba4d705c',
        pass: '',
        //password: nico666
      },
      rol: {
        id: 2,
        nombre: 'Invitado',
      },
      nombre: 'Nicolás',
      apellido: 'Carmona',
      correo: 'nico@mail.com',
      telefono: 912345678,
    },
  ];

  agregar_usuario(usuario: PerfilUsuario) {
    this.lista_usuarios.push(usuario);
    console.info(usuario);
    console.info(this.lista_usuarios);
  }

  encontrar_usuario(user: User): PerfilUsuario {
    console.info(this.lista_usuarios);
    //Se recorre la lista de usuarios hasta que el usuario y password coincidan
    for (let i = 0; i < this.lista_usuarios.length; i++) {
      if (
        this.lista_usuarios[i].user.usuario == user.usuario &&
        this.lista_usuarios[i].user.password === user.password
      ) {
        this.perfilUsuario = this.lista_usuarios[i];
      }
    }
    //Se retorna un usuario de tipo PerfilUsuario
    console.info(this.perfilUsuario);
    return this.perfilUsuario;
  }
}
