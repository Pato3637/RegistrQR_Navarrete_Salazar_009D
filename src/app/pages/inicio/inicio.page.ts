import { Component, OnInit } from '@angular/core';
import { MenuController } from  '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../service/registroservice.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  formularioLogin : FormGroup;
  usuarios : Usuario[] = [];
  

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private navController: NavController,
              private registroService: RegistroserviceService,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private fb: FormBuilder) {
                this.formularioLogin = this.fb.group({
                  'correo': new FormControl("",Validators.required),
                  'password': new FormControl("",Validators.required),
                })
              }

  ngOnInit() {
  }


  usuario = {
    email: '',
    password:''
  }

  onSubmit(){
    
    console.log('submit');
    console.log(this.usuario);
   
  }

    //método que comprueba la existencia del usuario en el storage
    async Ingresar(){
      var f = this.formularioLogin.value; 
      var a = 0;
      var nom = '';
      this.registroService.getUsuarios().then(datos => { 
        this.usuarios=datos;
        if (!datos || datos.length==0){
          return null;
        }
        for (let obj of this.usuarios){
          if (f.correo == obj.correoUsuario && f.password==obj.passUsuario){
            a=1;
            nom = 'Bienvenido ' + obj.nomUsuario;
            console.log('ingresado');
            localStorage.setItem('ingresado', 'true');
            
            this.showToast(nom);
            this.presentLoadingText();
  
          }
        }//findelfor 
        if (a==0){
          this.alertMsg();
        }
    });
  
  }//findelmetodo
  
  async alertMsg(){
    const alert = await this.alertController.create({ 
      header: 'Error..',
      message: 'Los datos ingresados son incorrectos',
      buttons: ['Aceptar']
    });
    await alert.present();
    return;
  }

  async cerrarSesion(){

    console.log('no ingresado');
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio');//habilitamos page de login

  };

  async showToast(msg){ //mensaje bottom bienvenido
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    })
    await toast.present();
  }

  async presentLoadingText() { //cuadro de espera 
    let loading =  this.loadingController.create({
      spinner: 'lines-sharp',
      message: 'Cargando, por favor espere...'
    });
    (await loading).present();

    setTimeout(() => {
      this.navController.navigateRoot('alert');
    }, 2000);
  
    setTimeout(async () => {
    (await loading).dismiss();
    }, 2000);
  }

}
