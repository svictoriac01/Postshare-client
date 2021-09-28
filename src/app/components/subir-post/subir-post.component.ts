import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

declare let window: any;
@Component({
  selector: 'app-subir-post',
  templateUrl: './subir-post.component.html',
  styleUrls: ['./subir-post.component.scss'],
})
export class SubirPostComponent implements OnInit {

  tempImages: string[] = [];
  loadLocation = false;

  post = {
    message: '',
    coords: null,
    position: false
  };

  constructor(private modalCtrl: ModalController,
    private postsService: PostsService,
    private geolocation: Geolocation,
    private camera: Camera) { }

  ngOnInit() { }


  async crearPost() {
    //console.log(this.post);
    await this.postsService.createPost(this.post);
    // Limpiar datos
    this.tempImages = [];
    this.post = { message: '', coords: null, position: false };
    this.modalCtrl.dismiss(this.post);
  }

  getLocation() {
    if (!this.post.position) {
      this.post.coords = null;
      this.loadLocation = false;
      return;
    }
    this.loadLocation = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadLocation = false;
      const coords = `${resp.coords.latitude}, ${resp.coords.longitude}`;
      console.log(coords);
      this.post.coords = coords;
    }).catch((error) => {
      //console.log('Error getting location', error);
      this.loadLocation = false;
    });

    console.log(this.post);
  }

  return() {
    this.tempImages = [];
    this.post = { message: '', coords: null, position: false };
    this.postsService.cleanTemp();
    this.modalCtrl.dismiss();
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    await this.processImage(options);
  }

  async openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    await this.processImage(options);
  }

  processImage(options: CameraOptions) {
    return new Promise<boolean>(resolve => {
      this.camera.getPicture(options).then(imageData => {

        const img = window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        // Subir archivo
        this.postsService.uploadImage(imageData);
        this.tempImages.push(img);
        resolve(true);
      }, (err) => {

        console.log(err);
        resolve(false);
      });
    });
  }


}
