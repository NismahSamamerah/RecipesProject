import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    commentForm: FormGroup = new FormGroup({
        comment: new FormControl('', [Validators.required,
        ]),
    });


    constructor(private commentService: CommentService,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
    }

    setRate(rate: number) {
        console.log(rate);
        //TODO:
    }
    saveComment() {
        const comment: IComment = {
            type_id: '',//TODO:
            user_id: this.auth.userID as string,
            comment: this.commentForm.value.comment,
            type: 'recipe'
        }
        this.commentService.saveCommentInfo(comment).then(res => {
            console.log(comment);
        }).catch(err => {
            console.log(err);
        })
    }

}
