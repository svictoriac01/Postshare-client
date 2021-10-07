/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.scss'],
})
export class DetailsUserComponent implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  @Input() usuario: Usuario = {};
  seguidores: Usuario [] = [];
  isFollow = false;
  state = 'Seguir';

  constructor(private modalCtrl: ModalController, private socialService: SocialService) { }

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
