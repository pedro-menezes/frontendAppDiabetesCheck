import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RealizarLancamentoPageRoutingModule } from './realizar-lancamento-routing.module';

import { RealizarLancamentoPage } from './realizar-lancamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RealizarLancamentoPageRoutingModule
  ],
  declarations: [RealizarLancamentoPage]
})
export class RealizarLancamentoPageModule {}
