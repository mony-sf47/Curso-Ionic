import { CatalogModule } from './catalog/catalog.module';
import { CatalogRoutingModule } from './catalog/catalog-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { PublicModule } from './public/public.module';
import { MembersModule } from './members/members.module';
import { PublicRoutingModule } from './public/public-routing.module';
import { MembersRoutingModule } from './members/members-routing.module';
import { AuthenticationService } from './services/authentication.service';
import { MapRoutingModule } from './map/map-routing.module';
import { MapModule } from './map/map.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './services/fcm.service';
import { NotasRoutingModule } from './notas/notas-routing.module';
import { NotasModule } from './notas/notas.module';
import { NotasService } from './services/notas.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicModule,
    IonicStorageModule.forRoot(),
    CatalogRoutingModule,
    CatalogModule,
    PublicRoutingModule,
    PublicModule,
    MembersRoutingModule,
    MembersModule,
    MapRoutingModule,
    MapModule,
    NotasRoutingModule,
    NotasModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath,
    AuthenticationService,
    Firebase,
    FcmService,
    ToastController,
    NotasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
