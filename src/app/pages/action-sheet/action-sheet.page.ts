import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController, ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Iasistencia } from 'src/app/interfaces/asistencia';
import { AsistenciaService } from 'src/app/service/asistencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {
  newAsistencia: Iasistencia = {
    registro: "",
    correo:""
  };
  code: any;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private asistenciaService: AsistenciaService,
    private alertController: AlertController,
    private menuController: MenuController,
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }
  mostrarMenu() {
    this.menuController.open('first')
  }

  async scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.code = barcodeData.text;
      console.log('Barcode data', this.code);
      
    }).catch(err => {
      console.log('Error', err);
    });
  }
  async reload() {
    window.location.reload();
  }

  async registro(){
    this.asistenciaService.addAsistencia(this.newAsistencia).subscribe();
    this.router.navigateByUrl("/qrgenerado");
    this.showToast('registrado correctamente');    
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
