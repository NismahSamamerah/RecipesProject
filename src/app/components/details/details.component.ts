import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IComment } from 'src/app/interfaces/comment';
import { CommentService } from 'src/app/services/comment.service';
import { RatingService } from 'src/app/services/rating.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Route, Router, TitleStrategy } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { IRating } from 'src/app/interfaces/rating';
import { IRecipe } from 'src/app/interfaces/recipe';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { Utils } from 'src/app/common/utils';
import { RecipeService } from 'src/app/services/recipe.service';




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
    isUsertype :string =''
    comments: any[] = [];
    recipes :IRecipe[] = [];
    loader :boolean =true;
    public rateAverage: number = 0;
    editVal : string=''
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
        private recipeService: RecipeService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
      setTimeout(()=>{
                this.data = JSON.parse(JSON.parse(JSON.stringify(this.router.snapshot.paramMap.get('data'))));

        if (this.data.hasOwnProperty('title')) {
            this.type = 'Recipe';
            this.type_id = this.data.title;
            console.log(this.type + this.type_id);

            if(this.data.hasOwnProperty('user_id')){
              this.isUsertype = 'user-recipe';
            }
        } else {
            this.type = 'Cocktail';
            this.type_id = this.data.name;
            if(this.data.hasOwnProperty('user_id')){
              this.isUsertype = 'user-cocktail';
            }
        }

        this.getRating();
        this.getComments();
        this.loader = false;
      },5000)
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

    getCocktailRating() {
        const sub = this.ratingService.getCocktailRating(this.type_id).subscribe(res => {
            this.rating = res;
            this.calculateRatingAverage();
            sub.unsubscribe();
        });
    }

    getComments() {
        this.type == 'Recipe' ? this.getRecipeComments() : this.getCocktailComments();
    }

    getRecipeComments(): void {
        const sub = this.commentService.getRecipeComments(this.type_id).subscribe(comments => {
          this.comments = comments;
            sub.unsubscribe();
        });
    }

    getCocktailComments(): void {
        const sub = this.commentService.getCocktailComments(this.type_id).subscribe(comments => {
            this.comments = comments;
            sub.unsubscribe();
        });
    }

    setRate(rate: number) {
        const rating: IRating = {
            type_id: this.type_id,
            user_id: this.auth.userID as string,
            rating: rate,
            type: this.type,
        }
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


    getUserRecipeForm(recipe: any) {
      this.route.navigate(['/recipe-form', { data: JSON.stringify(recipe) }]);

    }
}
