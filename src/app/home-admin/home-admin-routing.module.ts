import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAdminPage } from './home-admin.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminPage,
    children: [
      {
        path: 'relatorio-por-data',
        loadChildren: () => import('../relatorio-por-data/relatorio-por-data.module').then(m => m.RelatorioPorDataPageModule),
      },
      {
        path: 'ativar-users',
        loadChildren: () => import('../ativar-users/ativar-users.module').then(m => m.AtivarUsersPageModule),
      }
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAdminPageRoutingModule {}
