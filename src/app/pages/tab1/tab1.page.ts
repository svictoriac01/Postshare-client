/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSegment } from '@ionic/angular';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../interfaces/posts.interface';
import { SubirPostComponent } from '../../components/subir-post/subir-post.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('segment', { static: true }) segment: IonSegment;
  posts: Post[] = [];
  postsAux: Post[] = [];
  usuario: Usuario = {};
  disabled = false;

  constructor(private postsService: PostsService, private dataLocalService: DataLocalService,
    private modalCtrl: ModalController, private usuarioService: UsuarioService) { }

  // Obtener las publicaciones
  async ngOnInit() {
    this.segment.value = 'social';
    this.usuario = await this.usuarioService.getUsuario();
    this.loadData();

    this.postsService.newPost.subscribe(post => {
      this.posts.unshift(post);
    });
  }

  // Refrescar elementos
  doRefresh(event) {
    this.loadData(event, true);
    this.disabled = false;
    this.posts = [];
  }

  // Cargar nuevos elementos
  loadData(event?: any, refresher: boolean = false) {
    return new Promise<void>(resolve => {
      // Valor refresher para volver a la primera pagina si es true
      this.postsService.getPosts(refresher).subscribe(res => {
        console.log(res);
        this.posts.push(...res.posts); //Añade los posts como elementos individuales al array

        switch (this.segment.value) {
          case 'social':
            this.postsAux = this.posts;
            break;
          case 'postme':
            this.postsAux = this.posts.filter(post => post.usuario._id === this.usuario._id);
            break;
          case 'favs':
            this.postsAux = this.dataLocalService.posts;
            break;
        }

        if (event) {
          event.target.complete();

          if (res.posts.length === 0) {
            this.disabled = true;
          }
        }
        resolve();
      });
    });
  }

  // Abrir modal para añadir una publicación
  async addPost() {
    const modal = await this.modalCtrl.create({
      component: SubirPostComponent
    });
    return await modal.present();
  }

  // Pestañas cambio lista post
  async segmentChanged() {
    this.postsAux = [];
    await this.loadData();
  }
}


