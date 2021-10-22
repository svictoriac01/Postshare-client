import { EventEmitter, Injectable } from '@angular/core';
import { AlertController, ActionSheetController, ToastController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  navEvent = new EventEmitter<string>();

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private navCtrl: NavController) { }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  async navigatePage(route: string, params) {
    await this.navCtrl.navigateRoot(route);
    this.navEvent.emit(params);
  }

}
