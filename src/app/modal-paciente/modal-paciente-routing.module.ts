import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPacientePage } from './modal-paciente.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPacientePageRoutingModule {}
