import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICocktail } from 'src/app/interfaces/cocktail';
import { IRecipe } from 'src/app/interfaces/recipe';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { CocktailService } from 'src/app/services/cocktail.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public isLoggedIn: boolean | null = null;
  public name: string = '';
  suggested :boolean = false;
  recipes :IRecipe[] = [];
  type :string |null ='';
  users :IUser[] = [];
  cocktails :ICocktail[] = [];
  data: IRecipe | ICocktail | any;

  constructor(private auth : AuthService , private userService :UserService , private recipeService :RecipeService , private router :ActivatedRoute ,private route:Router ,private cocktailService :CocktailService) { }

  ngOnInit(): void {
    console.log(0);

    setTimeout(() => {
      this.type = this.router.snapshot.paramMap.get('data');
      console.log(this.type);

      if (this.type == 'Cocktail') {
          const sub = this.cocktailService.getUserCocktails(this.auth.userID as string).subscribe(cocktails => {
              this.cocktails = cocktails;
          });
      } else if (this.type == 'Recipe') {
          const sub = this.recipeService.getUserRecipes(this.auth.userID as string).subscribe(recipes => {
              this.recipes = recipes;
              console.log(this.recipes);
          });
      }
      // this.loader = false;
  }, 5000)
    const sub = this.auth.user.subscribe((user) => {
      if (user) {
          this.isLoggedIn = true;
          this.auth.userID = user?.uid;
          const subUser = this.userService.getUserById(this.auth.userID as string).subscribe(res => {
              for (const item of res) {

                  this.name = item.first_name + ' ' + item.last_name;
              } subUser.unsubscribe();
          })
      } else {
          this.isLoggedIn = false;
      }
      const subUser = this.userService.getUsers().subscribe(res => {
        this.users = res;
      })
  });

}
getFavorites(){
  this.route.navigate(['/favorite'])
}
viewAllRecipes(){
  this.route.navigate(['/user-recipe', { data: 'Recipe' }])
}
viewAllCocktails(){
  this.route.navigate(['/user-recipe', { data: 'Cocktail' }])
}
  goToSuggest(){
    this.route.navigate(['/suggest'])
}
}


