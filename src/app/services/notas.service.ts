import { Platform } from '@ionic/angular';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotaData, NotaItem, Item } from '../notas/type';
import {fromPromise} from 'rxjs/internal/observable/fromPromise';
@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(
    private afs: AngularFirestore
  ) { }

  agregarNota(nota: any): Observable<DocumentReference> {
    return  fromPromise(
      this.afs.collection('notas').add(nota)
    );
  }

  editarNota(id: string, nota: any): Observable<any> {
    return  fromPromise(
      this.afs.collection('notas').doc(id).update(nota)
    );
  }

  eliminarNota(id: string): Observable<any> {
    return fromPromise(
      this.afs.collection('notas').doc(id).delete()
    );
  }

  consultarNotas(): Observable<any[]> {
    return this.afs.collection('notas').snapshotChanges()
      .pipe(map(actions => {
        return actions.map(
          a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }
        );
      }));
  }

  consultarNota(id: string): Observable<any> {
    return this.afs.collection('notas').doc(id).snapshotChanges()
      .pipe(map(
        actions => {
          const data = actions.payload.data();
          const id = actions.payload.id;
          return { id, ...data };
        }
      ));
  }

}
