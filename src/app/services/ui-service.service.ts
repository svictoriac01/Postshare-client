import { Injectable } from '@angular/core';
import { AlertController, ActionSheetController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController, private toastCtrl: ToastController) { }

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


  async presentActionSheet() {
    const actionSheet = await this.actionCtrl.create({
      header: 'Foto del perfil',
      buttons: [
        {
          text: 'Galería',
          icon: 'image',
          handler: () => {
            console.log('Play clicked');
          }
        }, {
          text: 'Cámara',
          icon: 'camera',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }
}
