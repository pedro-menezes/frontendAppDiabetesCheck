import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RelatorioPorDataPageRoutingModule } from './relatorio-por-data-routing.module';

import { RelatorioPorDataPage } from './relatorio-por-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RelatorioPorDataPageRoutingModule
  ],
  declarations: [RelatorioPorDataPage]
})
export class RelatorioPorDataPageModule {}
