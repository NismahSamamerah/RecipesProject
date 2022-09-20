import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class RatingService {
    rating: Observable<any[]>;

    constructor(private angularFirestore: AngularFirestore) { 
        this.rating = this.angularFirestore.collection(`rating`).valueChanges();
    }

    saveRatingInfo(rating: any) {
        return this.angularFirestore.collection("rating").doc(rating.id).set(rating);
    }
    getRating(){
        return this.rating;
    }

   
}