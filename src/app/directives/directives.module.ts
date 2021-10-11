import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollHideDirective } from './scroll-hide.directive';



@NgModule({
  declarations: [
    ScrollHideDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScrollHideDirective
  ]
})
export class DirectivesModule { }
