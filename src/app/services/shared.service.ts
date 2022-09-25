import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IShared } from '../interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor( private angularFirestore: AngularFirestore) { }

  saveSharedInfo(shared: IShared) {
    return this.angularFirestore.collection(`shared`).doc(shared.id).set(shared);
  }
  
  getByUserId( id:string): Observable<any> {
    return this.angularFirestore.collection('shared', ref => ref.where('shared_users', 'array-contains', id)).valueChanges();
}

}
