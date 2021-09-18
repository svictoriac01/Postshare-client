import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
// Tuberia que transforma la imagen a un elemento del DOM
export class DomSanitizerPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(img: string): any {
    const domImg = `background-image: url('${img}');`;
    return this.domSanitizer.bypassSecurityTrustStyle(domImg);
  }

}
