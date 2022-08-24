import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtivarUsersPageRoutingModule } from './ativar-users-routing.module';

import { AtivarUsersPage } from './ativar-users.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtivarUsersPageRoutingModule
  ],
  declarations: [AtivarUsersPage]
})
export class AtivarUsersPageModule {}
