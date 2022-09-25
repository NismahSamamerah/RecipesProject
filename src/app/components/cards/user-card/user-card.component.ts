import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { IUser } from 'src/app/interfaces/user';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() recipe: IRecipe | undefined;
  @Input() cocktail: ICocktail | undefined;
  users: IUser[] = [];
  user_id: string ='';
  constructor(
    private recipeService: RecipeService,
    private cocktailService: CocktailService,
    private route: Router,
    private userService :UserService
  ) {}

  ngOnInit(): void {

  }

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
  getUsers(){
    this.userService.getUsers().subscribe(users =>{
      this.users = users;
      console.log(this.users);
    })
  }
  share(e :any){
    console.log(e.target.value);
  }
}
