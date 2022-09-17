import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private angularFirestore: AngularFirestore) { }


    saveCommentInfo(comment: any) {
        return this.angularFirestore.collection("comment").doc(comment.id).set(comment);
    }

}
