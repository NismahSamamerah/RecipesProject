import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    recipes: any[] = [];
    cocktails: any[] = [];
    loader :boolean =true;
    cocktailsShow: any[]= [];
    recipesShow: any[] = [];
    cocktailImg: any;
    recipeImg: any;
    cocktailImgs: any[] = [];
    recipeImgs: any[] = [];
    

    constructor(private route: Router,
        private cocktail: CocktailService,
        private recipe: RecipeService,
        private auth: AuthService,
        private api: ApiService) {
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
        
        setTimeout(() =>{ 
            for (let i = 0; i < 3; i++) {
                this.recipeImgs.push(this.recipeImg.results[Math.floor(Math.random()*10)].urls.regular)
                this.cocktailImgs.push(this.cocktailImg.results[Math.floor(Math.random()*10)].urls.regular)
                this.cocktailsShow.push(this.cocktails[Math.floor(Math.random() * this.cocktails.length)])
                this.recipesShow.push(this.recipes[Math.floor(Math.random() * this.recipes.length)])    
            }
        },2000)
    }
    getRecipeDetails(recipe: any) {
        if (this.auth.userID) {
            this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
        } else {
            this.route.navigate(['/login']);
        }
    }
}
