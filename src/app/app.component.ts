import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private navController: NavController,) {}
  componentes : Componente[] = [
    {
      icon:'home-outline',
      name: 'Inicio',
      redirecTo:'/alert'
    },  
    {
      icon:'aperture-outline',
      name: 'Leer QR',
      redirecTo:'/action-sheet'
    },   
    {
      icon:'airplane-outline',
      name: 'Feriados',
      redirecTo:'/card'
    },
    {
      icon:'information-circle-outline',
      name: 'Acerca de',
      redirecTo:'/informacion'
    },
    {
      icon:'exit-outline',
      name: 'Cerrar Sesión',
      redirecTo:'/logout'
    }
 

  ];

  async cerrarSesion(){

    console.log('no ingresado');
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio');//habilitamos page de login

  };
  
}
