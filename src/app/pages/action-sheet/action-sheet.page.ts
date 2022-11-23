import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {

  code: any;

  constructor(private alertController: AlertController,
    private menuController: MenuController,
    private navCtrl: NavController,
    private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
  }
  mostrarMenu(){
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

}
