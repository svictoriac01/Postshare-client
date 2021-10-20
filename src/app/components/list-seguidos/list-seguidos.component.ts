/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { SocialService } from '../../services/social.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { DetailsUserComponent } from '../details-user/details-user.component';

@Component({
  selector: 'app-list-seguidos',
  templateUrl: './list-seguidos.component.html',
  styleUrls: ['./list-seguidos.component.scss'],
})
export class ListSeguidosComponent implements OnInit {
  slideOpts = { allowSlidePrev: false, allowSlideNext: false };
  seguidos: Usuario[] = [];

  constructor(private modalCtrl: ModalController, private socialService: SocialService) { }

  async ngOnInit() {
    this.socialService.getSocialData().subscribe(data => {
      this.seguidos = data.social.seguidos;
    });
  }

  async unfollow(usuario: Usuario) {
    await this.socialService.removeSocialData(usuario, 'seguidores');
    this.seguidos = this.seguidos.filter(user => user._id !== usuario._id);
  }


  closeModal() {
    this.modalCtrl.dismiss();
  }
}
