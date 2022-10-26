import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroalumnoPage } from './registroalumno.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroalumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroalumnoPageRoutingModule {}
