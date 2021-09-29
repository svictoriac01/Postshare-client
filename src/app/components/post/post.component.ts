/* eslint-disable no-underscore-dangle */
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts.interface';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { PostsService } from '../../services/posts.service';
import { DataLocalService } from '../../services/data-local.service';


const URL = environment.url;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Post = {};
  slideOpts = {
    allowSlideNext: false,
    allowSlidePrev: false
  };

  isLike = false;

  constructor(private socialSharing: SocialSharing, private postsService: PostsService,
    private dataLocal: DataLocalService) { }

  ngOnInit() {
    if (this.post.favs > 0) {
      this.isLike = true;
    }
  }

  // Compartir publicación
  async share() {
    // eslint-disable-next-line max-len
    await this.socialSharing.share(this.post.message, this.post.usuario.username, this.post.imgs.map(img => `${URL}/posts/imagen/${this.post.usuario._id}/${img}`) || []);
  }

  // Gestión de likes
  async like() {
    this.isLike = !this.isLike;
    if (this.isLike) {
      this.post.favs++;
      this.dataLocal.guardarPost(this.post);
    } else {
      this.post.favs--;
      this.dataLocal.borrarPost(this.post);
    }

    await this.postsService.updatePosts(this.post);
  }

}
