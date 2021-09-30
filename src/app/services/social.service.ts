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

  posts: Post[] = [];
  follows: Usuario[] = [];

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.init();
  }


  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.getSocialData();
  }


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

  addSocialData(data: any, type: string) {
    let existe: any =  [];

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

  removeSocialData(data: any, type: string) {
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
    return new Promise<void>(resolve => {
      this.http.get<SocialResponse>(`${URL}/social`, { headers }).subscribe(resp => {
        this.posts = resp.social.favoritos || [];
        this.follows = resp.social.seguidos || [];
        resolve();
      });
    });
  }
}
