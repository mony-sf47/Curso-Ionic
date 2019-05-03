import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@NgModule({
  declarations: [
    LoginPage,
    RegisterPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    PublicRoutingModule
  ],
  providers: []
})
export class PublicModule { }
