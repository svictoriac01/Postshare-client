/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, RespuestaPosts } from '../interfaces/posts.interface';
import { UsuarioService } from './usuario.service';

// Url API-REST
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService) { }

  // Obtener lista de posts
  getPosts(refresher: boolean = false) {
    if (refresher) {
      this.paginaPosts = 0;
    }
    // Cada vez que se llama al metodo cambia de página
    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

  updatePosts(post: Post) {
    const headers = new HttpHeaders({ 'x-token': this.usuarioService.token });

    return new Promise(resolve => {
      this.http.put<Post>(`${URL}/posts/${post._id}`, post, { headers }).subscribe(resp => {
        console.log(resp);
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
