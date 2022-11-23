import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../service/registroservice.service';
import { ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registroalumno',
  templateUrl: './registroalumno.page.html',
  styleUrls: ['./registroalumno.page.scss'],
})
export class RegistroalumnoPage implements OnInit {

  formularioRegistro: FormGroup;
  newUsuario: Usuario = <Usuario>{};
  usuarios: Usuario[] =[]; 

  constructor(private menuController: MenuController,
              private registroService: RegistroserviceService,
              private alertController: AlertController,
              private toastController: ToastController,
              private fb: FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre': new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(100),Validators.pattern(/^[a-zA-z ]+$/)]),
                  'correo': new FormControl("",[Validators.required, Validators.pattern(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/)]),
                  'password': new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
                  'confirmaPass': new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(50)])
                });
              }
  
  mostrarMenu(){
    this.menuController.open('first')
  }
  ngOnInit() {
  }

  async CrearUsuario(){
    var form = this.formularioRegistro.value;
    var existe = 0;

    if (this.formularioRegistro.invalid){
      this.alertError();
      console.log('error')
    }
    else{
      if(form.confirmaPass != form.password){
      this.alertErrorPass();
      console.log('errorPass')
    }else{
      

    this.newUsuario.nomUsuario = form.nombre,
    this.newUsuario.correoUsuario = form.correo,
    this.newUsuario.passUsuario = form.password,
    this.newUsuario.repassUsuario = form.confirmaPass;
    this.registroService.getUsuarios().then(datos=>{ 
      this.usuarios = datos; 
  
      if (!datos || datos.length==0){
        this.registroService.addDatos(this.newUsuario).then(dato=>{ 
          this.newUsuario=<Usuario>{};
          this.showToast('Usuario Creado Correctamente');
        });
        this.formularioRegistro.reset();
      }else{
      
      for (let obj of this.usuarios){
        if (this.newUsuario.correoUsuario == obj.correoUsuario){
          existe = 1;
        }
      }//Fin del for
    
        if (existe == 1){
          this.alertCorreoDuplicado();
        }
        else{
          this.registroService.addDatos(this.newUsuario).then(dato=>{ 
            this.newUsuario=<Usuario>{};
            this.showToast('Usuario Creado Correctamente');
          });
          this.formularioRegistro.reset();
        }
      }
      }) 
  }
  }
  }

  async alertErrorPass(){
    const alert = await this.alertController.create({ 
      header: 'Contraseñas Inválidas',
      message: 'Las contraseñas deben coincidir',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async alertError(){
    const alert = await this.alertController.create({ 
      header: 'Error..',
      message: 'Se deben completar correctamente todos los datos',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async alertCorreoDuplicado(){
    const alert = await this.alertController.create({ 
      header: '¡Error!',
      message: 'Ya existe una cuenta con este correo',
      buttons: ['Aceptar']
    })
    await alert.present();
  }

  async showToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  

}
