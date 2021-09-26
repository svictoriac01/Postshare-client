import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonSlides } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private uiService: UiServiceService,
    private postsService: PostsService) { }


  ngOnInit(): void {
    this.slides.lockSwipes(true);
    this.usuario = this.usuarioService.getUsuario();
  }

  // Actualizar usuario
  async actualizar(fUpdate: NgForm) {
    if (fUpdate.invalid) { return; }

    const actualizado = await this.usuarioService.update(this.usuario);
    if (actualizado) {
      // toast usuario actualizado
      await this.uiService.presentToast('Usuario actualizado');
    } else {
      // error
      await this.uiService.presentToast('No se ha podido actualizar el usuario');
    }
  }

  async logout() {
    this.postsService.paginaPosts = 0;
    await this.usuarioService.logout();
  }

  // Menu para subir un avatar
  async subirImagen() {
    await this.uiService.presentActionSheet();
  }
}
