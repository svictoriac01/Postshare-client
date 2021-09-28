import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from '../../services/usuario.service';
import { ActionSheetController, IonSlides, ModalController } from '@ionic/angular';


declare let window: any;


@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.scss'],
})
export class ActualizarUsuarioComponent implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  @Input() usuario: Usuario = {};
  imgTemp: string;

  constructor(private usuarioService: UsuarioService, private camera: Camera,
    private uiService: UiServiceService, private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController) { }

  async ngOnInit() {
    //this.usuario = await this.usuarioService.getUsuario();
    //console.log(this.usuario);
    //this.usuario = await this.usuarioService.getUsuario();
    console.log(this.usuario);
    this.slides.lockSwipes(true);
    this.imgTemp = null;
  }


  // Actualizar usuario
  async actualizar(fUpdate: NgForm) {
    if (fUpdate.invalid) { return; }

    const actualizado = await this.usuarioService.update(this.usuario);
    if (actualizado) {
      // toast usuario actualizado
      this.modalCtrl.dismiss(this.usuario);
      await this.uiService.presentToast('Usuario actualizado');
    } else {
      // error
      await this.uiService.presentToast('No se ha podido actualizar el usuario');
    }
  }


  // Back
  async return() {
    this.imgTemp = null;
    this.usuarioService.cleanTemp();
    this.modalCtrl.dismiss({ close: true });
  }


  // Menu para subir un avatar
  async subirImagen() {
    await this.presentActionSheet();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionCtrl.create({
      header: 'Foto del perfil',
      backdropDismiss: true,
      buttons: [
        {
          text: 'Galería',
          icon: 'image',
          handler: () => {
            this.openGallery();
          }
        }, {
          text: 'Cámara',
          icon: 'camera',
          handler: () => {
            this.openCamera();
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        }]
    });
    await actionSheet.present();
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.processImage(options);
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.processImage(options);
  }

  async processImage(options: CameraOptions) {
    this.camera.getPicture(options).then(async imageData => {

      const img = window.Ionic.WebView.convertFileSrc(imageData);
      //console.log(img);
      // Subir archivo
      this.usuarioService.uploadAvatar(imageData);
      this.imgTemp = img;
    }, (err) => {
      console.log(err);
    });
  }

}
