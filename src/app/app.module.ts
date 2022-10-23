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
import { UserCardComponent } from './components/cards/user-card/user-card.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharePopComponent } from './components/share-pop/share-pop.component';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { ProfileComponent } from './components/profile/profile.component';



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
    UserCardComponent,
    NotFoundComponent,
    SharePopComponent,
    ProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserAnimationsModule,

  ],
  providers: [RecipeComponent,UserRecipeComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
