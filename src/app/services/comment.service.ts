import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    comments: Observable<any[]>;

    constructor(private angularFirestore: AngularFirestore) {
        this.comments = this.angularFirestore.collection(`comment`).valueChanges();
     }


    saveCommentInfo(comment: any) {
        return this.angularFirestore.collection("comment").doc(comment.id).set(comment);
    }
    readCommentInfo(){
        //TODO:
        // for(let comment of this.comments){
        // }  
        console.log(this.comments);  
        return this.comments;
    }

}
