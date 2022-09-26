import { Component, Input, OnInit } from '@angular/core';
import { IComment } from 'src/app/interfaces/comment';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

    @Input() comment: IComment | undefined;
    public commentUser: IUser | undefined;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this.getCommentUser();
        console.log(JSON.stringify(this.comment));
        
    }

    getCommentUser(): void {
        const sub = this.userService.getUserById(this.comment?.user_id as string).subscribe(user => {
            this.commentUser = user[0];
            sub.unsubscribe();
        });
    }

}
