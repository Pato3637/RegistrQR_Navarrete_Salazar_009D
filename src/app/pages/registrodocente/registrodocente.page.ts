import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registrodocente',
  templateUrl: './registrodocente.page.html',
  styleUrls: ['./registrodocente.page.scss'],
})
export class RegistrodocentePage implements OnInit {

  constructor(private menuController: MenuController) { }
  
  mostrarMenu(){
    this.menuController.open('first')
  }
  ngOnInit() {
  }

  usuario = {
    email: '',
    password:'',
    rut:'',
    profesor:true,
  }

  onSubmit(){
    console.log('submit');
    console.log(this.usuario);
  }
  
}
