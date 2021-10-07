/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { SocialService } from '../../services/social.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss'],
})
export class DetailsUserComponent implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  @Input() usuario: Usuario = {};
  seguidores: Usuario[] = [];
  isFollow = false;
  state = 'Seguir';
  nSeguidos = 0;
  nPublicaciones = 0;
  nLikes = 0;

  constructor(private modalCtrl: ModalController, private socialService: SocialService,
    private postService: PostsService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.socialService.getSocialData().subscribe(follows => {
      //console.log(postsFav);
      const existe = follows.social.seguidos.some(user => user._id === this.usuario._id);
      if (existe) {
        this.isFollow = true;
        this.state = 'Siguiendo';
      }
    });

    this.socialService.getSocialDataUser(this.usuario._id).subscribe(data => {
      this.nLikes = data.social.favoritos.length;
      this.nSeguidos = data.social.seguidos.length;
    });

    this.postService.getAllPosts().subscribe(data => {
      const post = data.posts.filter(post => post.usuario._id === this.usuario._id);
      this.nPublicaciones = post.length;
    });
  }


  // Seguir usuarios
  async follow() {
    this.isFollow = !this.isFollow;

    if (this.isFollow) {
      await this.socialService.addSocialData(this.usuario, 'seguidores');
      this.state = 'Siguiendo';
    } else {
      await this.socialService.removeSocialData(this.usuario, 'seguidores');
      this.state = 'Seguir';
    }

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
