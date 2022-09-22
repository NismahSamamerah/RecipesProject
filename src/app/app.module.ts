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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuth } from '@angular/fire/compat/auth'

import { environment } from 'src/environments/environment';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { SlidesComponent } from './components/slides/slides.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/cards/card/card.component';
import { UserRecipeComponent } from './components/user-recipe/user-recipe.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './components/comment/comment.component';


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
    NavbarComponent,
    RecipeFormComponent,
    SlidesComponent,
    FooterComponent,
    CardComponent,
    UserRecipeComponent,
    CommentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    FormsModule
  ],
  providers: [RecipeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
