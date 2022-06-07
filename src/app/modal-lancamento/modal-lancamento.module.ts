import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalLancamentoPageRoutingModule } from './modal-lancamento-routing.module';

import { ModalLancamentoPage } from './modal-lancamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalLancamentoPageRoutingModule
  ],
  declarations: [ModalLancamentoPage]
})
export class ModalLancamentoPageModule {}
