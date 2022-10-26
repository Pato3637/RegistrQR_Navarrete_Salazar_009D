import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {

  constructor(private alertController: AlertController,
    private menuController: MenuController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }
  mostrarMenu(){
    this.menuController.open('first')
  }

  async leerqr() {    //1ra Alerta
    let date: Date = new Date();
    const alert = await this.alertController.create({
      
      header: 'Solicitud de acceso a la cámara',
      message: '*Accediendo a la cámara...*',
      buttons: [
        {text:'Ok',}],
    });

    await alert.present();
  }

}
