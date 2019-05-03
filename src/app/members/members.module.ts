import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { DashboardPage } from './dashboard/dashboard.page';
import { AuthenticationService } from '../services/authentication.service';

@NgModule({
  declarations: [
    DashboardPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    MembersRoutingModule
  ],
  providers: []
})
export class MembersModule { }
