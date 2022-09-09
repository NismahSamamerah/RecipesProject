import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailComponent } from './components/cocktail/cocktail.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RegisterComponent } from './components/register/register.component';
import { UserCocktailComponent } from './components/user-cocktail/user-cocktail.component';

const routes: Routes = [
  {path : "cocktail" , component : CocktailComponent},
  {path : "user-cocktail" , component : UserCocktailComponent},
  {path : "recipe-form" , component : RecipeFormComponent},
  {path : "recipe" , component : RecipeComponent},
  {path : "register" , component : RegisterComponent},
  {path : "login" , component : LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
