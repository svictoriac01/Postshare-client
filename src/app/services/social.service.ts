/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocialResponse, Social } from '../interfaces/social.interface';
import { UsuarioService } from './usuario.service';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario.interface';
import { Post } from '../interfaces/posts.interface';


const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class SocialService {

  private posts: Post[] = [];
  private follows: Usuario[] = [];

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }



  createSocialData(social: Social) {
    const headers = new HttpHeaders({ 'x-token': this.usuarioService.token });

    return new Promise<boolean>(resolve => {
      this.http.post<SocialResponse>(`${URL}/social/create`, social, { headers }).subscribe(resp => {
        //console.log(resp);
        if (resp.ok) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async addSocialData(data: any, type: string) {
    let existe: any = [];

    const dataSocial = await this.getSocialData().toPromise();
    this.posts = dataSocial.social.favoritos;
    this.follows = dataSocial.social.seguidos;

    switch (type) {
      case 'favoritos':
        existe = this.posts.find(post => post._id === data._id);
        if (!existe) { this.posts.unshift(data); }
        break;
      case 'seguidores':
        existe = this.follows.find(user => user._id === data._id);
        if (!existe) { this.follows.unshift(data); }
        break;
    }

    const headers = new HttpHeaders({ 'x-token': this.usuarioService.token });

    return new Promise<boolean>(resolve => {
      this.http.put<SocialResponse>(`${URL}/social/update`, { favoritos: this.posts || [], seguidos: this.follows || [] }, { headers }).subscribe(resp => {
        console.log(resp);
        if (resp.ok) {
          console.log(resp);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  async removeSocialData(data: any, type: string) {

    const dataSocial = await this.getSocialData().toPromise();
    this.posts = dataSocial.social.favoritos;
    this.follows = dataSocial.social.seguidos;

    switch (type) {
      case 'favoritos':
        this.posts = this.posts.filter(post => post._id !== data._id);
        break;
      case 'seguidores':
        this.follows = this.follows.filter(user => user._id !== data._id);
        break;
    }

    const headers = new HttpHeaders({ 'x-token': this.usuarioService.token });

    return new Promise<boolean>(resolve => {
      this.http.put<SocialResponse>(`${URL}/social/update`, { favoritos: this.posts, seguidos: this.follows }, { headers }).subscribe(resp => {
        console.log(resp);
        if (resp.ok) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }



  getSocialData() {
    const headers = new HttpHeaders({ 'x-token': this.usuarioService.token });
    return this.http.get<SocialResponse>(`${URL}/social`, { headers });
  }
}
