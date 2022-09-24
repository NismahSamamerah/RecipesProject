import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IMostRating } from '../interfaces/mostRating';

@Injectable({
    providedIn: 'root'
})
export class MostRateService {

    constructor(private angularFirestore: AngularFirestore,) { }
    saveMostRateInfo( obj:any) {
        return this.angularFirestore.collection(`most_rating`).doc(obj.type).set(obj);
    }
    getMostRate(type: string):   Observable<any[]>{
        return this.angularFirestore.collection(`most_rating`, ref => ref.where('type', '==', type)).valueChanges();
    }

}

