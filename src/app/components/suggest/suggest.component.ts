import { Component, OnInit } from '@angular/core';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { AuthService } from 'src/app/services/auth.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-suggest',
    templateUrl: './suggest.component.html',
    styleUrls: ['./suggest.component.css']
})
export class SuggestComponent implements OnInit {
    cocktails: ICocktail[] = [];
    recipes: IRecipe[] = [];
    tempRecipes : IRecipe[] = [];
    tempCocktails : ICocktail[] = [];
    recipeSearchArr :IRecipe[]  =[];
    cocktailSearchArr :ICocktail[]  =[];
    searchVal :string = '';
    filterVal :string ='all';
    public name :string =''
    loader: boolean = true;


    constructor(private sharedService: SharedService,
        private recipeService: RecipeService,
        private cocktailService: CocktailService,
        private auth: AuthService,
        private userService :UserService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {
      const subUser = this.userService.getUserById(this.auth.userID as string).subscribe(res => {
        for(const item of res){
          this.name = item.first_name;
        }subUser.unsubscribe();
      })
        const sub = this.sharedService.getByUserId(this.auth.userID as string).subscribe(res => {
            for (const item of res) {
                if(item.type == 'cocktail'){
                    const csub = this.cocktailService.getCocktailById(item.recipe_id).subscribe(cocktails =>{
                        for (const cocktail of cocktails) {
                            this.cocktails.push(cocktail);
                        }
                        this.tempCocktails = cocktails;
                        csub.unsubscribe();
                    })
                }else if(item.type == 'recipe'){
                    const rsub = this.recipeService.getRecipeById(item.recipe_id).subscribe(recipes =>{
                        for (const recipe of recipes) {
                            this.recipes.push(recipe)
                        }
                        this.tempRecipes = recipes;
                        rsub.unsubscribe();
                    })
                }
            }
            sub.unsubscribe();
        });
        setTimeout(()=>{
          this.loader = false;
        },2000)
    }
    addToFavorite() {

    }
    onClick(filterVal :string){
      this.filterVal = filterVal;
    }
    searchRecipe() {
      if(this.searchVal){
        this.recipeSearchArr = this.recipes.filter(res  => {
        return res.title.toLowerCase().includes(this.searchVal.toLowerCase());
      })
      this.recipes =[];
      }else{
        this.recipes = this.tempRecipes;
      }
  }
  searchCocktail() {
    if(this.searchVal){
      this.cocktailSearchArr = this.cocktails.filter(res  => {
      return res.name.toLowerCase().includes(this.searchVal.toLowerCase());
    })
    this.cocktails =[];
    }else{
      this.cocktails = this.tempCocktails;
    }
}
}
