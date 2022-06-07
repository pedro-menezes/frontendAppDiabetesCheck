import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizarHistoricoPageRoutingModule } from './visualizar-historico-routing.module';

import { VisualizarHistoricoPage } from './visualizar-historico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizarHistoricoPageRoutingModule
  ],
  declarations: [VisualizarHistoricoPage]
})
export class VisualizarHistoricoPageModule {}
