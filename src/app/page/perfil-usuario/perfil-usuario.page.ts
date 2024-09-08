import { Component, OnInit } from '@angular/core';
import { PerfilUsuario } from 'src/app/models/perfil-usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  user!: PerfilUsuario;

  constructor(private router: Router) { }

  ngOnInit() {
    //Se obtiene el usuario enviado al navegar desde página login hacia home con la función login()
    this.user = this.router.getCurrentNavigation()?.extras?.state?.['usuario'];
    console.info(this.user);
  }
}
