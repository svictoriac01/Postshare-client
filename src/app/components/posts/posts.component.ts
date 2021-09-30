import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../interfaces/posts.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Output() deletePost = new EventEmitter<Post>();
  @Input() posts: Post[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.posts);
  }

  removePost(post: Post) {
    //console.log(post);
    this.deletePost.emit(post);
  }

}
