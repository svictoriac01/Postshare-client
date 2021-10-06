/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { LoginResponse, UsuarioResponse, UsuariosResponse } from '../interfaces/usuario.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { NavController } from '@ionic/angular';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token = null;
  newAvatar = new EventEmitter();
  private usuario: Usuario = {};
  private _storage: Storage | null = null;

  // Inyectar servicios o modulos
  constructor(private http: HttpClient, private storage: Storage,
    private navCtrl: NavController, private fileTransfer: FileTransfer) {
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

      this.http.post<LoginResponse>(`${URL}/user/login`, data).subscribe(async (resp) => {
        console.log(resp);
        // Si el login es correcto el token se guarda en el localStorage
        if (resp.ok) {
          await this.saveToken(resp.token);
          resolve(true);

        } else {
          // Si el login no es correcto se borran los datos
          this.token = null;
          await this._storage.clear();
          resolve(false);
        }
      });
    });
  }

  register(usuario: Usuario) {
    return new Promise(resolve => {

      this.http.post<LoginResponse>(`${URL}/user/create`, usuario).subscribe(async (resp) => {
        console.log(resp);
        // Si el registro es correcto el token se guarda en el localStorage
        if (resp.ok) {
          await this.saveToken(resp.token);
          resolve(true);

        } else {
          // Si el registro no es correcto se borran los datos
          this.token = null;
          await this._storage.clear();
          resolve(false);
        }
      });
    });
  }

  // Obtener usuario
  async getUsuario() {
    if (!this.usuario._id) {
      await this.validToken();
    }
    //await this.validToken();
    return { ...this.usuario };
  }


  // Guardar token en el localStorage
  async saveToken(token: string) {
    this.token = token;
    await this._storage.set('token', this.token);
    await this.validToken();
  }

  // Obtener token del localStorage
  async getToken() {
    this.token = await this.storage.get('token') || null;
  }

  // Verificar token
  async validToken(): Promise<boolean> {
    //debugger;
    await this.getToken();

    // Si no existe token se redirige al login
    if (!this.token) {
      this.navCtrl.navigateRoot('/auth/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {
      const headers = new HttpHeaders({ 'x-token': this.token });

      this.http.get<UsuarioResponse>(`${URL}/user/`, { headers }).subscribe(resp => {
        if (resp.ok) {
          this.usuario = resp.usuario;
          resolve(true);
        } else {
          this.navCtrl.navigateRoot('/auth/login');
          resolve(false);
        }
      });
    });
  }

  // Actualizar usuario
  update(usuario: Usuario) {
    const headers = new HttpHeaders({ 'x-token': this.token });

    return new Promise<boolean>(resolve => {
      this.http.put<LoginResponse>(`${URL}/user/update`, usuario, { headers }).subscribe(async (resp) => {
        // Si el registro es correcto el token se guarda en el localStorage
        if (resp.ok) {
          await this.saveToken(resp.token);
          //console.log(usuario);
          resolve(true);

        } else {
          // Si el registro no es correcto se borran los datos
          this.token = null;
          await this._storage.clear();
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this._storage.clear();
    this.navCtrl.navigateRoot('/auth/login', { animated: true });
  }

  uploadAvatar(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.token
      }
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${URL}/user/upload`, options).then(data => {
      this.newAvatar.emit(JSON.parse(data.response));
    }).catch(err => {
      console.log('Error en carga:', err);
    });
  }

  cleanTemp() {
    const headers = new HttpHeaders({ 'x-token': this.token });
    this.http.delete(`${URL}/user/temp`, { headers }).subscribe(resp => {
      console.log(resp['ok']);
    });
  }

  getUsuarios() {
    return this.http.get<UsuariosResponse>(`${URL}/user/all`);
  }
}
