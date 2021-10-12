import { Component, Input, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Article } from '../../interfaces/noticias.interface';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() index: number;
  //@Input() enFavoritos;

  constructor(private iab: InAppBrowser, private socialSharing: SocialSharing, private platform: Platform) { }

  ngOnInit() {}

  abrirNoticia() {
    //console.log('Noticia:', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  share() {
    if (this.platform.is('cordova')) {
      this.socialSharing.share(this.noticia.title, this.noticia.source.name, '', this.noticia.url);
    }
    else {
      if (navigator.share) {
        navigator.share({
          title: this.noticia.title,
          text: this.noticia.source.name,
          url: this.noticia.url,
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se ha podido compartir porque la plataforma no es compatible');
      }
    }
  }
}
