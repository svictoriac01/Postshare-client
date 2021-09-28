import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { AvatarPipe } from './avatar.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    AvatarPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    AvatarPipe
  ]
})
export class PipesModule { }
