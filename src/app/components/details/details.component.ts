import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { RecipeComponent } from '../recipe/recipe.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  recipeTitle?:string;
recipe :any=[]
  activeRouter: any;

  constructor(public route : Router , public apiService :ApiService , public recipeComponent : RecipeComponent) { }

  ngOnInit(): void {
    // this.recipeTitle = String(this.activeRouter.snapshot.paramMap.get('id'));
    //     if (this.recipeTitle) {
    //         const queryParams = new HttpParams().set('', this.recipeTitle)
    //         this.apiService.get('/student-details', { params: queryParams }).subscribe(
    //             (data) => {
    //                 this.recipe = data as any;
    //             },
    //             (error) => {
    //                 console.log(error);
    //             }
    //         )
    //     }

  }

}
