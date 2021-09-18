import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // Hace referencia a un elemento del DOM
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;

  constructor() { }

  async ngOnInit() {
    await this.slides.lockSwipes(true);
  }

  register(fRegister: NgForm) {
    console.log(fRegister.valid);
  }
}
