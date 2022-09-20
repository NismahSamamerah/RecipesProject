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


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
    fivePresents: number = 0;
    fourPresents: number = 0;
    threePresents: number = 0;
    towPresents: number = 0;
    onePresents: number = 0;
    five: number = 0;
    four: number = 0;
    three: number = 0;
    tow: number = 0;
    one: number = 0;
    sum: number = 0;
    type_id: string = '';
    type: string = '';
    public data: IRecipe | ICocktail | any;
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
        this.myComments()
        this.myRating()

    }
    myRating() {


        this.ratingService.getRating().subscribe(rating => {
            for (let rate of rating) {
                if (rate.type_id == this.type_id) {
                    switch (rate.rating) {
                        case 5:
                            this.five++;
                            break;
                        case 4:
                            this.four++;
                            break;
                        case 3:
                            this.three++;
                            break;
                        case 2:
                            this.tow++;
                            break;
                        default:
                            this.one++;
                            break;
                    }
                }
            }
                console.log(this.sum + " is sum");
                console.log(this.five + " is 5");
                console.log(this.four + " is 4");
                console.log(this.three + " is 3");
                console.log(this.tow + " is 2");
                console.log(this.one + " is 1");
           
        });
        this.sum = this.five + this.four + this.three + this.tow + this.one;
        
        this.fivePresents = (this.five / this.sum) * 10 / 10;
        this.fourPresents = (this.four / this.sum) * 10 / 10;
        this.threePresents = (this.three / this.sum) * 10 / 10;
        this.towPresents = (this.tow / this.sum) * 10 / 10;
        this.onePresents = (this.one / this.sum) * 10 / 10;
    }
    myComments() {
        this.commentService.readCommentInfo()?.subscribe(comments => {
            for (let comment of comments) {
                if (comment.type_id == this.type_id) {
                    this.comments.push(comment);
                }
            }
        });

        console.log(this.data);
        if(this.data.hasOwnProperty('title')) {
            this.type = 'recipe'
        }else{this.type = 'cocktail'
    }

    }


   

    setRate(rate: number) {
        const rating: IRating = {
            type_id: this.type_id,

            user_id: this.auth.userID as string,
            rating: rate,
            type: this.type
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
            id: this.generateID(),
            type_id: this.type_id,
            user_id: this.auth.userID as string,
            comment: comment.comment,
            type: this.type,

        }
        this.commentService.saveCommentInfo(commentI).then(res => {
            console.log(commentI);
        }).catch(err => {
            console.log(err);
        })
    }
    generateID() {
        let m = 9;
        let s = '', r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < m; i++) { s += r.charAt(Math.floor(Math.random() * r.length)); }
        return s;
    }


}
