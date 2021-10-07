/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';
import { ActualizarUsuarioComponent } from '../../components/actualizar-usuario/actualizar-usuario.component';
import { IonSlides, ModalController } from '@ionic/angular';
import { SocialService } from '../../services/social.service';
import { Post } from '../../interfaces/posts.interface';


declare let window: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  usuario: Usuario = {};
  seguidos: Usuario[] = [];
  posts: Post [] = [];
  favoritos: Post [] = [];
  nSeguidos = 0;
  nPublicaciones = 0;
  nFavoritos = 0;

  constructor(private usuarioService: UsuarioService, private socialService: SocialService,
    private postsService: PostsService, private modalCtrl: ModalController) { }


  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuario();

    this.socialService.getSocialData().subscribe(data => {
      this.seguidos = data.social.seguidos;
      this.nSeguidos = this.seguidos.length;
      this.favoritos = data.social.favoritos;
      this.nFavoritos = this.favoritos.length;
    });

    this.postsService.getAllPosts().subscribe(data => {
      this.posts = data.posts.filter(post => post.usuario._id === this.usuario._id);
      this.nPublicaciones = this.posts.length;
    });


    this.socialService.follow.subscribe(isFollow => {
      if (isFollow) {
        this.nSeguidos++;
      } else {
        this.nSeguidos--;
      }
    });

    this.socialService.like.subscribe(isLike => {
      if (isLike) {
        this.nFavoritos++;
      } else {
        this.nFavoritos--;
      }
    });

    this.postsService.newPost.subscribe(() => this.nPublicaciones++);

    this.slides.lockSwipes(true);
  }


  logout() {
    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
  }

  async actualizar() {
    const modal = await this.modalCtrl.create({
      component: ActualizarUsuarioComponent,
      animated: true,
      componentProps: { usuario: this.usuario }
    });
    await modal.present();
  }
}
