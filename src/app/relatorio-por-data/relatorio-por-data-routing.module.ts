import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelatorioPorDataPage } from './relatorio-por-data.page';

const routes: Routes = [
  {
    path: '',
    component: RelatorioPorDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelatorioPorDataPageRoutingModule {}
