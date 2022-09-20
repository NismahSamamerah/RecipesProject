import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
    providedIn: 'root'
})
export class RatingService {

    constructor(private angularFirestore: AngularFirestore) { }

    saveRatingInfo(rating: any) {
        return this.angularFirestore.collection("rating").doc(rating.id).set(rating);
    }
   
}