/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { ModalController } from '@ionic/angular';
import { DetailsUserComponent } from '../../components/details-user/details-user.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  search = false;
  textoBuscar = '';
  usuario: Usuario = {};
  usuarios: Usuario[] = [];
  buscando = false;

  constructor(private usuarioService: UsuarioService, private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuario();
    //this.loadUsers();
  }


  openSearch() {
    this.loadUsers();
    this.search = !this.search;
  }

  onSearch(event: any) {
    this.buscando = true;
    this.textoBuscar = event.detail.value;
    this.buscando = false;
  }

  cancelar() {
    this.usuarios = [];
    this.textoBuscar = '';
    this.buscando = false;
    this.search = false;
  }

  loadUsers() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarios = res.usuarios.filter(user => user._id !== this.usuario._id);
    });
  }

  async verUsuario(usuario: Usuario) {
    const modal = await this.modalCtrl.create({
      component: DetailsUserComponent,
      componentProps: { usuario },
      animated: true
    });

    return await modal.present();
  }

}
