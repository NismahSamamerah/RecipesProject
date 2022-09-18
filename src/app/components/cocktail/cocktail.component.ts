import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFavorite } from 'src/app/interfaces/favorit';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
  cocktails : any = [];
  cocktail : string = '';
  constructor(public router : Router , public apiService :ApiService , public auth : AuthService ,public user : UserService) { }

  ngOnInit(): void {
    this.apiService.getCocktailsByName("orange").subscribe((data: any) => {
      this.cocktails = data;

    },(error)=>{
      console.log(error);
    });
  }

  loadCocktail(): void {
    this.apiService.getCocktailsByName(`${this.cocktail}`).subscribe(
        (data: any) => {
          console.log(data);

            this.cocktails = data ;
        },
        (error) => {
            console.log(error);
        }
    );
  }
  goToUserRecipes(){
    this.router.navigate(['user-cocktail']);
  }
}
