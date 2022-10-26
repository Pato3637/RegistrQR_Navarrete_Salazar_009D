import { Component, OnInit } from '@angular/core';
import { NavController,AlertController,MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  

  constructor(private navController : NavController,
              private alertController: AlertController,
              private loadingController : LoadingController,
              private menuController: MenuController,
              private toastController: ToastController) { }

  ngOnInit() {
    console.log('no ingresado');
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio');
    this.showToast('Sesión cerrada correctamente');
    this.presentLoadingText();
    
  }
  async presentLoadingText() { //cuadro de espera 
    let loading =  this.loadingController.create({
      spinner: 'lines-sharp',
      message: 'Saliendo, por favor espere...'
    });
    (await loading).present();

    setTimeout(() => {
      this.navController.navigateRoot('alert');
    }, 4000);
  
    setTimeout(async () => {
    (await loading).dismiss();
    }, 1000);
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }


};



