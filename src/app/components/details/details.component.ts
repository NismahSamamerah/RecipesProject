import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { RatingService } from 'src/app/services/rating.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { IRating } from 'src/app/interfaces/rating';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    public data: any;
    comments: any[] = [];
    commentForm: FormGroup = new FormGroup({
        comment: new FormControl('', [Validators.required,
        ]),
    });



    constructor(
        private router: ActivatedRoute,
        public route: Router,
        public apiService: ApiService,
        public recipeComponent: RecipeComponent,
        private commentService: CommentService,
        private ratingService: RatingService,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {
        this.data = JSON.parse(JSON.parse(JSON.stringify(this.router.snapshot.paramMap.get('data'))));
        console.log(this.data);
        this.commentService.readCommentInfo()?.subscribe(comments => {
            this.comments=comments;
        });
        console.log(this.comments)
    }


    setRate(rate: number) {
        const rating: IRating = {
            type_id: this.data.title,
            user_id: this.auth.userID as string,
            rating: rate,
            type: 'recipe'
        }
        console.log(rating);
        this.ratingService.saveRatingInfo(rating).then(res => {
            console.log(rating);
        }).catch(err => {
            console.log(err);
        })
    }
    saveComment(comment: any) {

         const commentI: IComment = {
            type_id: this.data.title as string,
            user_id: this.auth.userID as string,
            comment: comment.comment,
            type: 'recipe'
        }
        this.commentService.saveCommentInfo(commentI).then(res => {
            console.log(commentI);
        }).catch(err => {
            console.log(err);
        })
    }

}
