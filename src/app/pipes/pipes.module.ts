import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImageSanitizerPipe } from './image-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { AvatarPipe } from './avatar.pipe';
import { FiltroPipe } from './filtro.pipe';



@NgModule({
  declarations: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    AvatarPipe,
    FiltroPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DomSanitizerPipe,
    ImageSanitizerPipe,
    ImagenPipe,
    AvatarPipe,
    FiltroPipe
  ]
})
export class PipesModule { }
