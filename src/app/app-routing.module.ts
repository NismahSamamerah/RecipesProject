import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailComponent } from './components/cocktail/cocktail.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { DetailsComponent } from './components/details/details.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RegisterComponent } from './components/register/register.component';
import { SharePopComponent } from './components/share-pop/share-pop.component';
import { SuggestComponent } from './components/suggest/suggest.component';

import { UserRecipeComponent } from './components/user-recipe/user-recipe.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';


const routes: Routes = [
  {path : "register" , component : RegisterComponent ,canActivate :[GuestGuard]},
  {path : "login" , component : LoginComponent, canActivate: [GuestGuard]},
  {path : "home" , component : HomeComponent,  },
  {path : "" , component : HomeComponent},
  {path : "recipe" , component : RecipeComponent ,canActivate: [AuthGuard]},
  {path : "cocktail" , component : CocktailComponent , canActivate: [AuthGuard]},
  {path : "contact-us" , component : ContactUsComponent},
  {path : "user-recipe" , component : UserRecipeComponent},
  {path : "recipe-form" , component : RecipeFormComponent},
  {path : "contact-us" , component : ContactUsComponent},
  {path : "suggest" , component : SuggestComponent , canActivate: [AuthGuard]},
  {path : "favorite" , component : FavoriteComponent , canActivate: [AuthGuard]},
  {path : "recipe-details" , component : DetailsComponent},
  {path : "share" , component : SharePopComponent},
  {path : "profile" , component : ProfileComponent},
  {path : "**" , component : NotFoundComponent},



];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
