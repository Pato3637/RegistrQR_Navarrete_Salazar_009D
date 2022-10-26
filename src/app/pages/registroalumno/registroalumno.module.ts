import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroalumnoPageRoutingModule } from './registroalumno-routing.module';

import { RegistroalumnoPage } from './registroalumno.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroalumnoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroalumnoPage]
})
export class RegistroalumnoPageModule {}
