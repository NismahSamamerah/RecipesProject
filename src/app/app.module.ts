import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SuggestComponent } from './components/suggest/suggest.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { CocktailComponent } from './components/cocktail/cocktail.component';
import { DetailsComponent } from './components/details/details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    SuggestComponent,
    FavoriteComponent,
    RecipeComponent,
    CocktailComponent,
    DetailsComponent,
    ContactUsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
