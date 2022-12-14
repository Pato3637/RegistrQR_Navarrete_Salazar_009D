import { Component, OnInit } from '@angular/core';
import { MenuController, InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/service/asistencia.service';

@Component({
  selector: 'app-qrgenerado',
  templateUrl: './qrgenerado.page.html',
  styleUrls: ['./qrgenerado.page.scss'],
})
export class QrgeneradoPage implements OnInit {
  asistencia = []

  constructor(private asistenciaService: AsistenciaService, private loadController: LoadingController, private menuController: MenuController) { }

  ngOnInit() {
    this.verAsistencia();
  }
  mostrarMenu() {
    this.menuController.open('first');
  }

  
  async verAsistencia(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadController.create({
      message: "Cargando tu asistencia :D",
      spinner: "crescent"
    });
    await loading.present();

    this.asistenciaService.verAsistencia().subscribe(
      (resp) => {
        loading.dismiss();
        console.log(resp);
        let listString = JSON.stringify(resp)
        this.asistencia = JSON.parse(listString)
        event?.target.complete();

      },
      (err) => {
        console.log(err.message)
        loading.dismiss();
      }
    )
  }
}