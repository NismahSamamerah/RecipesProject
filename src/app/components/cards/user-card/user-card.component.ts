import { Component, Input, OnInit } from '@angular/core';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() recipe: IRecipe | undefined;
  @Input() cocktail: ICocktail | undefined;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  deleteRecipe(recipe: any) {
    this.recipeService.delete(recipe);
}
}
