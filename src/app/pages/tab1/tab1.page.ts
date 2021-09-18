import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  disabled = false;

  constructor(private postsService: PostsService) { }

  // Obtener las publicaciones
  ngOnInit(): void {
    this.loadData();
  }

  // Refrescar elementos
  doRefresh(event) {
    this.loadData(event, true);
    this.disabled = false;
    this.posts = [];
  }

  // Cargar nuevos elementos
  loadData(event?: any, refresher: boolean = false) {

    this.postsService.getPosts(refresher).subscribe(res => {
      console.log(res);
      this.posts.push(...res.posts); //Añade los posts como elementos individuales al array
      if (event) {
        event.target.complete();

        if (res.posts.length === 0) {
          this.disabled = true;
        }
      }
    });
  }
}


