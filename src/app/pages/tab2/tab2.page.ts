/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { ModalController, IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { DetailsUserComponent } from '../../components/details-user/details-user.component';
import { Article } from '../../interfaces/noticias.interface';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild('segment', { static: false }) segment: IonSegment;
  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;

  search = false;
  textoBuscar = '';
  usuario: Usuario = {};
  usuarios: Usuario[] = [];
  buscando = false;

  categorias: string [] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article [] = [];
  value: string;

  constructor(private usuarioService: UsuarioService, private modalCtrl: ModalController,
    private noticiasService: NoticiasService) { }

  async ngOnInit() {
    this.usuario = await this.usuarioService.getUsuario();

    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
    //this.loadUsers();
  }

  // Buscador de usuarios
  openSearch() {
    this.loadUsers();
    this.search = !this.search;

    this.value = this.segment.value;
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


  // Noticias
  segmentChanged(event: any): void {
    this.noticias = [];
    this.infiniteScroll.disabled = false;
    this.cargarNoticias(event.detail.value);
  }


  loadData(event: any) {
    this.cargarNoticias(this.segment.value, event);
  }

  cargarNoticias(categoria: string, event?) {
    this.noticiasService.getTopHeadLinesCategoria(categoria).subscribe(
      res => {
        //console.log(res);
        if (res.articles.length === 0) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }

        this.noticias.push(...res.articles);

        if (event) {
          event.target.complete();
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
