import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailComponent } from './components/cocktail/cocktail.component';
import { UserCocktailComponent } from './components/user-cocktail/user-cocktail.component';

const routes: Routes = [
  {path : "cocktail" , component : CocktailComponent},
  {path : "user-cocktail" , component : UserCocktailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
