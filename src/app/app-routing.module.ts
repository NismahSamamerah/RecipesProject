import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailComponent } from './components/cocktail/cocktail.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RegisterComponent } from './components/register/register.component';
import { UserCocktailComponent } from './components/user-cocktail/user-cocktail.component';
import { UserRecipeComponent } from './components/user-recipe/user-recipe.component';

const routes: Routes = [
  {path : "register" , component : RegisterComponent},
  {path : "login" , component : LoginComponent},
  {path : "home" , component : HomeComponent},
  {path : "recipe" , component : RecipeComponent},
  {path : "cocktail" , component : CocktailComponent},
  {path : "user-recipe" , component : UserRecipeComponent},
  {path : "user-cocktail" , component : UserCocktailComponent},
  {path : "recipe-form" , component : RecipeFormComponent},
  {path : "contact-us" , component : ContactUsComponent},
  {path : "details" , component : DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
