import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces/posts.interface';

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


  constructor() { }

  ngOnInit() {
  }

}
