import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtivarUsersPage } from './ativar-users.page';

const routes: Routes = [
  {
    path: '',
    component: AtivarUsersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtivarUsersPageRoutingModule {}
