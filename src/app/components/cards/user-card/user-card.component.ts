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
    private userService: UserService,
    private route: Router
  ) {}

  ngOnInit(): void {

  }

  deleteRecipe(recipe: any) {
    this.recipeService.delete(recipe);
  }
  getUserRecipeDetails(recipe: any) {
    this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
  }
  getUsers(){
     const sub = this.userService.getUsers().subscribe(users =>{
        this.users = users;
        sub.unsubscribe()
    })
  }
  deleteCocktail(cocktail: any) {
    this.cocktailService.deleteCocktail(cocktail);
  }
  share(){
    this.getUsers()
    console.log(this.user_id);
    

    //TODO:pop up to chose users
    
  }
}
