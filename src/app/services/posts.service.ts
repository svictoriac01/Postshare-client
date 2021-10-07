/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, RespuestaPosts, RespuestaPost } from '../interfaces/posts.interface';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

// Url API-REST
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;
  // Evento que emite cuando se crea una publicación
  newPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService,
    private fileTransfer: FileTransfer) { }

  // Obtener lista de posts
  getPosts(refresher: boolean = false) {
    if (refresher) {
      this.paginaPosts = 0;
    }
    // Cada vez que se llama al metodo cambia de página
    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${URL}/posts/?pagina=${this.paginaPosts}`);
  }

  // Crear post
  createPost(post: Post) {
    const headers = new HttpHeaders({ 'x-token': this.usuarioService.token });

    return new Promise(resolve => {
      this.http.post<RespuestaPost>(`${URL}/posts`, post, { headers }).subscribe(resp => {
        //console.log(resp);
        this.newPost.emit(resp.post);
        resolve(true);
      });
    });
  }

  // Actualizar post
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
  // Servicio para subir archivos
  uploadImage(img: string) {
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${URL}/posts/upload`, options).then(data => {
      console.log(data);
    }).catch(err => {
      console.log('Error en carga:', err);
    });
  }


  cleanTemp() {
    const headers = new HttpHeaders({ 'x-token': this.usuarioService.token });
    this.http.delete(`${URL}/posts/temp`, { headers }).subscribe(resp => {
      console.log(resp['ok']);
    });
  }

  getAllPosts() {
    return this.http.get<RespuestaPosts>(`${URL}/posts/all`);
  }

}
