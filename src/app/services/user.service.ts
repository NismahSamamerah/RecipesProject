import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICocktail } from '../interfaces/cocktail';
import { IRecipe } from '../interfaces/recipe';
import { IUser } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    cocktaildoc:AngularFirestoreDocument<any> | undefined;

    constructor(private angularFirestore: AngularFirestore,
        private auth: AuthService) {}
   
    saveUserInfo(newUser: IUser) {
        return new Promise(resolve => {
            const sub = this.auth.user.subscribe(user => {
                this.auth.userID = user?.uid;
                newUser.id = user?.uid as string;
                resolve(this.angularFirestore.doc(`users/${this.auth.userID}`).set(newUser));
            })
        })
    }
    
    getUserById(userId: string): Observable<any> {
        return this.angularFirestore.collection('users', ref => ref.where('id', '==', userId)).valueChanges();
    }
    
    contactInfo(item: any){
        return this.angularFirestore.collection(`contact/`).doc().set(item);
    }

}
