import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private uiService: UiServiceService) { }


  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
  }

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

  logout() {

  }

  // Menu para subir un avatar
  async subirImagen() {
    await this.uiService.presentActionSheet();
  }
}
