import { Component, OnInit } from '@angular/core';
import { AlertController,MenuController,NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})
export class AlertPage implements OnInit {
  handlerMessage = '';
  roleMessage = '';

  constructor(private alertController: AlertController,
    private navController: NavController,
    private menuController: MenuController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }
  mostrarMenu() {
    this.menuController.open('first');
  }

  async SaludoOk() {    //alerta generar codigo
    let date: Date = new Date();
    const alert = await this.alertController.create({

      header: 'Codigo Generado',
      message: 'Se registró: ' + date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear() + ' Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Listo',
          role: 'confirm',
          handler: data => {
            this.navCtrl.navigateRoot('/qrgenerado');
          },
        },

      ],
    });

    await alert.present();
  }
  async Alerta1() {    //1ra alerta una opcion
    let date: Date = new Date();
    const alert = await this.alertController.create({

      header: 'Codigo Generado',
      message: 'Se registró: ' + date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear() + ' Hora: ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
      buttons: [{text:'listo' , handler: data => {
        this.navCtrl.navigateRoot('/qrgenerado') //;
      },}],
    });

    await alert.present();
  }


/**no se usan  */
  async Confirmar() {  //2da Alerta 2 botones si/no
    const alert = await this.alertController.create({
      header: '¡Alerta!',
      subHeader: '¿Desea analizar su dispositivo?',
      buttons: [
        {
          text: 'No', //este define lo que se muestra
          role: 'cancel', //esta es la funcion, NO se toca
          handler: () => {
            this.handlerMessage = 'El usuario no quiso analizar';
          },
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'El usuario si quiso analizar';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
//Alerta formulario
  async inputAlert() {
    const alert = await this.alertController.create({
      header: 'Por Favor Ingresa tu información',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Nombre',
        },
        {
          placeholder: 'Nickname (max 8 characters)',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'Edad',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'Acerca de ti.',
        },
      ],
    });

    await alert.present();
  }
  async cerrarSesion(){

    console.log('no ingresado');
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio');//habilitamos page de login
    this.showToast('Sesión cerrada correctamente');
    this.presentLoadingText();

  };

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async presentLoadingText() { //cuadro de espera 
    let loading =  this.loadingController.create({
      spinner: 'lines-sharp',
      message: 'Cerrando sesión...'
    });
    (await loading).present();

    setTimeout(() => {
      this.navController.navigateRoot('inicio');
    }, 1000);
  
    setTimeout(async () => {
    (await loading).dismiss();
    }, 1000);
  }


}

