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

  constructor(private postsService: PostsService) { }

  // Obtenemos las publicaciones
  ngOnInit(): void {
    this.postsService.getPosts().subscribe(res => {
      this.posts.push(...res.posts); //Añadimos los posts como elementos individuales al array
      console.log(res);
    });
  }
}
