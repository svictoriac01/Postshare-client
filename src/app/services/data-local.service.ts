/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/posts.interface';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  posts: Post[] = [];
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
    this.cargarFavoritos();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarPost(post: Post) {
    const existe = this.posts.find(p => p._id === post._id);

    if (!existe) {
      this.posts.unshift(post);
      this._storage.set('favoritos', this.posts);
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      this.posts = favoritos;
    }
  }

  borrarPost(post: Post) {
    this.posts = this.posts.filter(p => p._id !== post._id);
    this._storage.set('favoritos', this.posts);
  }

}
