/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../interfaces/usuario.interface';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token = null;
  private _storage: Storage | null = null;

  // Inyectar servicios o modulos
  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }


  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  login(user: string, password: string) {
    const data = { user, password };
    return new Promise<boolean>(resolve => {

      this.http.post<LoginResponse>(`${URL}/user/login`, data).subscribe(resp => {
        console.log(resp);
        // Si el login es correcto el token se guarda en el localStorage
        if (resp.ok) {
          this.saveToken(resp.token);
          resolve(true);

        } else {
          // Si el login no es correcto se borran los datos
          this.token = null;
          this._storage.clear();
          resolve(false);
        }
      });
    });
  }

  async saveToken(token: string) {
    this.token = token;
    await this._storage.set('token', token);
  }


}
