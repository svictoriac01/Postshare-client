import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Hace referencia a un elemento del DOM
  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;
  loginUser = { user: 'santivc_07', password: '4321' };

  constructor(private navCtrl: NavController, private usuarioService: UsuarioService,
    private uiService: UiServiceService) { }

  async ngOnInit() {
    await this.slides.lockSwipes(true);
  }

  // Login
  async login(fLogin: NgForm) {
    if (fLogin.invalid) { return; }
    const exist = await this.usuarioService.login(this.loginUser.user, this.loginUser.password);

    if (exist) {
      // Navegar a tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // Mostrar alerta de que el login no es correcto
      await this.uiService.presentAlert('Nombre de usuario y / o contraseña no válidos');
    }
  }

  // Ir a registro
  toRegister() {
    this.navCtrl.navigateRoot('/auth/register', { animated: true });
  }
}
