import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform
  ) { }

    async getToken() {
      let token;

      if(this.platform.is('android')) {
        token = await this.firebase.getToken();
      }

      if(this.platform.is('ios')) {
        token = await this.firebase.getToken();
        await this.firebase.grantPermission();
      }

      console.log(token);

      this.saveToken(token);
    }

    private saveToken(token) {
      if(!token) {
        return;
      }

      const devicesRef = this.afs.collection('devices');
      const data = { token, userId: 'testUserId' };

      return devicesRef.doc(token).set(data);
    }

    onNotifications() {
      return this.firebase.onNotificationOpen();
    }

}
