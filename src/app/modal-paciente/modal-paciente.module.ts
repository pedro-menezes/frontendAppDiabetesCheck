import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPacientePageRoutingModule } from './modal-paciente-routing.module';

import { ModalPacientePage } from './modal-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPacientePageRoutingModule
  ],
  declarations: [ModalPacientePage]
})
export class ModalPacientePageModule {}
