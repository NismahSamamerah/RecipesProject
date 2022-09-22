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
import { IRecipe } from 'src/app/interfaces/recipe';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { UserService } from 'src/app/services/user.service';
import { Utils } from 'src/app/common/utils';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    
    rating: IRating[] = [];
    type_id: string = '';
    type: string = '';
    public data: IRecipe | ICocktail | any;
    comments: any[] = [];
    public rateAverage: number = 0;
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
        private auth: AuthService,
        private user: UserService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
        this.data = JSON.parse(JSON.parse(JSON.stringify(this.router.snapshot.paramMap.get('data'))));
        if (this.data.hasOwnProperty('title')) {
            this.type = 'recipe';
            this.type_id = this.data.title;
        } else {
            this.type = 'cocktail';
            this.type_id = this.data.name;
        }
        this.getRating();
        this.getComments();
    }

    calculateRatingAverage() {
        let sum: number = 0;
        for (let rate of this.rating) {
            sum += rate.rating;
        }
        if (this.rating.length > 0) {
            this.rateAverage = parseInt((sum / this.rating.length).toString());
            return (sum / this.rating.length).toFixed(2);
        }
        return 0;
    }

    getRating() {
        this.type == 'recipe' ? this.getRecipeRating() : this.getCocktailRating();
    }

    getRecipeRating() {
        const sub = this.ratingService.getRecipeRating(this.type_id).subscribe(res => {
            this.rating = res;
            console.log(this.rating);
            
            this.calculateRatingAverage();
            sub.unsubscribe();
        });
    }

    getCocktailRating() { }

    getComments() {
        this.type == 'recipe'? this.getRecipeComments(): this.getCocktailComments();
    }

    getRecipeComments(): void {
        const sub = this.commentService.getRecipeComments(this.type_id).subscribe(comments => {
            this.comments = comments;
            sub.unsubscribe();
        });
    }

    getCocktailComments(): void {

    }

    setRate(rate: number) {
        const rating: IRating = {
            type_id: this.type_id,
            user_id: this.auth.userID as string,
            rating: rate,
            type: this.type,
        }
        console.log(rating);
        this.ratingService.saveRatingInfo(rating);
    }

    saveComment(comment: any) {
        const commentI: IComment = {
            id: Utils.generateID(),
            type_id: this.type_id,
            user_id: this.auth.userID as string,
            comment: comment.comment,
            type: this.type,

        }
        this.comments.push(commentI);
        this.commentForm.reset();
        this.commentService.saveCommentInfo(commentI).then(res => {
            
        }).catch(err => {
            console.log(err);
        })
    }
}
