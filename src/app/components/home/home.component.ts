import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { RatingService } from 'src/app/services/rating.service';
import { IRating } from 'src/app/interfaces/rating';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [
        trigger('fade', [
            transition('void =>*', [
                style({ opacity: 0 }),
                animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
            ])
        ])
    ]
})
export class HomeComponent implements OnInit {
    recipes: any[] = [];
    cocktails: any[] = [];
    loader: boolean = true;
    cocktailsShow: any[] = [];
    recipesShow: any[] = [];
    cocktailImg: any;
    recipeImg: any;
    cocktailImgs: any[] = [];
    recipeImgs: any[] = [];
    rating: IRating[] = [];
    average: any[] = [];
    cAverage: any[] = [];
    cRating: IRating[] = [];;


    constructor(private route: Router,
        private cocktail: CocktailService,
        private recipe: RecipeService,
        private auth: AuthService,
        private api: ApiService,
        private ratingService: RatingService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }
    ngOnInit(): void {
        const subR = this.recipe.getRecipes().subscribe(recipes => {
            this.recipes = recipes;
            subR.unsubscribe();
        });
        const subC = this.cocktail.getCocktails().subscribe(cocktails => {
            this.cocktails = cocktails;
            subC.unsubscribe();
        });
        const cSub = this.api.getImage('cocktail').subscribe(res => {
            this.cocktailImg = res;
            cSub.unsubscribe();
        });
        const rSub = this.api.getImage('recipe').subscribe(res => {
            this.recipeImg = res;
            rSub.unsubscribe();
        });

        setTimeout(() => {
            for (let i = 0; i < 3; i++) {
                this.recipeImgs.push(this.recipeImg.results[Math.floor(Math.random() * 10)].urls.regular)
                this.cocktailImgs.push(this.cocktailImg.results[Math.floor(Math.random() * 10)].urls.regular)
                this.cocktailsShow.push(this.cocktails[Math.floor(Math.random() * this.cocktails.length)])
                this.recipesShow.push(this.recipes[Math.floor(Math.random() * this.recipes.length)])
            }
            this.getRecipeRating();
            this.getCocktailRating();
        }, 7000)
    }
    getRecipeDetails(recipe: any) {
        if (this.auth.userID) {
            this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
        } else {
            this.route.navigate(['/login']);
        }
    }
    calculateRatingAverage(arr: IRating[]) {
        let sum: number = 0;
        if (arr.length > 0) {
            for (let rate of arr) {
                sum += rate.rating;
            }
            return (sum / arr.length).toFixed(2);
        }
        return 0;
    }

    getRecipeRating() {
        this.recipesShow.forEach(element => {
            const sub = this.ratingService.getRecipeRating(element.title).subscribe(res => {
                this.rating = res;
                sub.unsubscribe();
                this.average.push(this.calculateRatingAverage(this.rating));
                console.log(this.average);
            });
        });
    }

    getCocktailRating() {
        this.cocktailsShow.forEach(element => {
            const sub = this.ratingService.getCocktailRating(element.name).subscribe(res => {
                this.cRating = res;
                sub.unsubscribe();
                this.cAverage.push(this.calculateRatingAverage(this.cRating));
                console.log(this.cAverage);
            });
        });
    }
}
