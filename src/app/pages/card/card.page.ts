import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FeriadosService } from '../../service/feriados.service';
import { Datos } from '../../interfaces/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  feriados: Datos[] = [];

  constructor(private menuController: MenuController,
              public feriadosService: FeriadosService) { }           
  
  mostrarMenu(){
    this.menuController.open('first')
  }
  ngOnInit() {
    this.feriadosService.obtenerFeriados().subscribe(resp => {
      console.log('feriados',resp);
      this.feriados.push(...resp.data)
    });
  }

}
