/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';
import { ActualizarUsuarioComponent } from '../../components/actualizar-usuario/actualizar-usuario.component';
import { IonSlides, ModalController } from '@ionic/angular';
import { SocialService } from '../../services/social.service';


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
  nSeguidos = 0;
  nPublicaciones = 0;

  constructor(private usuarioService: UsuarioService, private socialService: SocialService,
    private postsService: PostsService, private modalCtrl: ModalController) { }


  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuario();

    this.postsService.getPosts().subscribe(data => {
        this.nPublicaciones = data.posts.filter(user => user._id === this.usuario._id).length;
    });

    this.socialService.getSocialData().subscribe(data => {
      this.seguidos = data.social.seguidos;
      this.nSeguidos = this.seguidos.length;
    });


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
