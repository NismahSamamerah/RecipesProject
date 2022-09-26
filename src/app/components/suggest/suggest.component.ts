import { Component, OnInit } from '@angular/core';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
    selector: 'app-suggest',
    templateUrl: './suggest.component.html',
    styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {
    cocktails: ICocktail[] = [];
    recipes: IRecipe[] = [];
    recipeSearchArr :IRecipe[]  =[];
    cocktailSearchArr :ICocktail[]  =[];
    searchVal :string = '';
    fitlerVal :string ='all'


    constructor(private sharedService: SharedService,
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private auth: AuthService,) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {
        const sub = this.sharedService.getByUserId(this.auth.userID as string).subscribe(res => {
            for (const item of res) {
                if(item.type == 'cocktail'){
                    this.cocktailService.getCocktailById(item.recipe_id).subscribe(cocktails =>{
                        for (const cocktail of cocktails) {
                            this.cocktails.push(cocktail)
                        }
                    })
                }else if(item.type == 'recipe'){
                    this.recipeService.getRecipeById(item.recipe_id).subscribe(recipes =>{
                        for (const recipe of recipes) {
                            this.recipes.push(recipe)
                        }
                    })
                }
            }
            sub.unsubscribe();
        });
    }
    addToFavorite() {

    }
    onClick(filterVal :string){
      this.fitlerVal = filterVal
    }
    searchRecipe() {
      this.recipeSearchArr = this.recipes.filter(res  => {
        return res.title.toLowerCase().includes(this.searchVal.toLowerCase());
      })
      this.recipes =[];
  }
  searchCocktail() {
    this.cocktailSearchArr = this.cocktails.filter(res  => {
      return res.name.toLowerCase().includes(this.searchVal.toLowerCase());
    })
    this.cocktails =[];
}
}
