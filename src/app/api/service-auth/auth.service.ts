import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private salt: string = 'some-random-salt'; 

  constructor() { }

  //Método para encriptar la contraseña
  encryptPassword(password: string): string {
    //Se crea un hash usando SHA-256
    const hashed = CryptoJS.SHA256(password + this.salt).toString(CryptoJS.enc.Hex);
    return hashed;
  }
  
}