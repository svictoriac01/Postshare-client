import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { PostsService } from '../../services/posts.service';
import { ActualizarUsuarioComponent } from '../../components/actualizar-usuario/actualizar-usuario.component';
import { IonSlides, ModalController } from '@ionic/angular';


declare let window: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService,
    private postsService: PostsService, private modalCtrl: ModalController) { }


  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuario();
    this.slides.lockSwipes(true);

    this.usuarioService.newAvatar.subscribe(async token => {
      this.usuario = await this.usuarioService.getDataUsuario(token);
      console.log(this.usuario);
    });
  }


  async logout() {
    this.postsService.paginaPosts = 0;
    await this.usuarioService.logout();
  }

  async actualizar() {
    const modal = await this.modalCtrl.create({
      component: ActualizarUsuarioComponent,
      animated: true,
      componentProps: { usuario: this.usuario }
    });
    console.log(this.usuario);
    await modal.present();
  }
}
