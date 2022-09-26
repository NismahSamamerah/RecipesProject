import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
    selector: 'app-user-recipe',
    templateUrl: './user-recipe.component.html',
    styleUrls: ['./user-recipe.component.css']
})
export class UserRecipeComponent implements OnInit {

    type: string | null = '';
    recipes: IRecipe[] = [];
    recipeSearch: IRecipe[] = [];
    cocktails: ICocktail[] = [];
    cocktailSearch: ICocktail[] = [];
    searchValue: string = '';
    public data: IRecipe | ICocktail | any;
    loader :boolean =true;

    constructor(public route: Router,
        private cocktailService: CocktailService,
        private recipeService: RecipeService,
        private auth: AuthService,
        private router: ActivatedRoute) {
            const sub = this.auth.user.subscribe(user => {
                this.auth.userID = user?.uid;
                sub.unsubscribe();
            })
        }

    ngOnInit(): void {
        this.type = this.router.snapshot.paramMap.get('data');
        console.log(this.type);
        if (this.type == 'Cocktail') {
            const sub = this.cocktailService.getUserCocktails(this.auth.userID as string).subscribe(cocktails => {
                this.cocktails = cocktails;
                sub.unsubscribe();
            });
        } else if (this.type == 'Recipe') {
            const sub = this.recipeService.getUserRecipes(this.auth.userID as string).subscribe(recipes => {
                this.recipes = recipes;
                sub.unsubscribe();
            });
        }
        setTimeout(()=>{
          this.loader = false;
        },3000)
      }
    
    searchByName() {
        if (this.type == 'Cocktail') {
            this.searchCocktailByName();
        }else{
            this.searchRecipeByName();
        }
    }

    searchCocktailByName() {
        this.cocktailSearch = this.cocktails.filter(recipe => {
            return recipe.name.toLowerCase().includes(this.searchValue.toLowerCase());
        })
        this.cocktails=[];
    }

    searchRecipeByName() {
        this.recipeSearch = this.recipes.filter(recipe => {
            return recipe.title.toLowerCase().includes(this.searchValue.toLowerCase());
        })
        this.recipes=[];
    }

    addNewRecipe() {
            this.route.navigate(["/recipe-form", { id: this.type }])
    }

    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
    }
}
