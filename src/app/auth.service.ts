import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private salt: string = 'some-random-salt'; // Cambia esto por una sal más segura en producción

  constructor() { }

  // Método para encriptar la contraseña
  encryptPassword(password: string): string {
    // Crear un hash usando SHA-256
    const hashed = CryptoJS.SHA256(password + this.salt).toString(CryptoJS.enc.Hex);
    return hashed;
  }
  
}