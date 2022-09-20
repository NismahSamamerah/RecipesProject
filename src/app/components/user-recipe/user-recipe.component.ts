import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user-recipe',
    templateUrl: './user-recipe.component.html',
    styleUrls: ['./user-recipe.component.css']
})
export class UserRecipeComponent implements OnInit {
    public type :string | null=''
    recipes:IRecipe[] =[];
    cocktails :ICocktail[] =[];
    recipe :string ='';

    recipesSearch :IRecipe[] =[];
    searchValue :string ='';


    constructor(public route: Router,
        private userService: UserService ,
        private router: ActivatedRoute) { }

    ngOnInit(): void {
      this.recipesSearch;
      this.type = this.router.snapshot.paramMap.get('data');
      console.log(this.type);

      if (this.type == 'cocktail') {
        this.userService.getCocktails().subscribe(cocktails => {
          this.cocktails = cocktails;
      });
    } else if (this.type == 'recipe') {

      this.userService.getRecipes().subscribe(recipes => {
        this.recipes = recipes;
    });
    }
    }


    searchByName(){
      //TODO:
      this.recipesSearch=[];
      for(let recipe of this.recipes){
        if(recipe.title.includes(this.searchValue)){
          this.recipesSearch.push(recipe);
        }
      }
      this.recipes = [];
  }

    addNewRecipe(type: string) {
        if (type) {
            this.route.navigate(["/recipe-form", { id: type }])
        }
    }
    deleteRecipe(recipe: any) {
        this.userService.delete(recipe);
    }
    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipee', { data: JSON.stringify(recipe) }]);
    }
}
