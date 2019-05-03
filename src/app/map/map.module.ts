import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleMaps } from '@ionic-native/google-maps';
import { MapRoutingModule } from './map-routing.module';
import { MapPage } from './map/map.page';

@NgModule({
  declarations: [
    MapPage
  ],
  imports: [
    CommonModule,
    IonicModule,
    MapRoutingModule
  ],
  providers: [
    GoogleMaps
  ]
})
export class MapModule { }
