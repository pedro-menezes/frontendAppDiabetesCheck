import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizarHistoricoPage } from './visualizar-historico.page';

const routes: Routes = [
  {
    path: '',
    component: VisualizarHistoricoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarHistoricoPageRoutingModule {}
