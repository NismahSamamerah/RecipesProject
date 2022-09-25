import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() recipe: IRecipe | undefined;
  @Input() cocktail: ICocktail | undefined;
  constructor(
    private recipeService: RecipeService,
    private cocktailService: CocktailService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  deleteRecipe(recipe: any) {
    this.recipeService.delete(recipe);
  }
  getUserRecipeDetails(recipe: any) {
    this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
    console.log('data from card');
    console.log(recipe);
  }
  deleteCocktail(cocktail: any) {
    this.cocktailService.deleteCocktail(cocktail);
  }
}
