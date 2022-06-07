import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalLancamentoPage } from './modal-lancamento.page';

const routes: Routes = [
  {
    path: '',
    component: ModalLancamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalLancamentoPageRoutingModule {}
