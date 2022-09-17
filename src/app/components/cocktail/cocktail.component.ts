import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cocktail',
  templateUrl: './cocktail.component.html',
  styleUrls: ['./cocktail.component.css']
})
export class CocktailComponent implements OnInit {
  cocktails : any = [];
  constructor(public router : Router , public apiService :ApiService) { }

  ngOnInit(): void {
    this.getCocktails()
  }
  getCocktails(){
    this.apiService.getRecipesByName("bloody mary").subscribe((data: any) => {
      this.cocktails = data;
      console.log(data,"this is data from api nismah cocktails");

    },(error)=>{
      console.log(error);
    });
}
  goToUserRecipes(){
    this.router.navigate(['user-cocktail']);
  }

}
