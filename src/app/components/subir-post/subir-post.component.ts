import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

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
    private geolocation: Geolocation) { }

  ngOnInit() { }


  async crearPost() {
    //console.log(this.post);
    await this.postsService.createPost(this.post);
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
    this.modalCtrl.dismiss();
  }
}
