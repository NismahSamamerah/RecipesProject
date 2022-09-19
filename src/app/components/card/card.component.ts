import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    recipes: any = [];
    recipe: string = '';
    

    constructor(private apiService: ApiService, public route: Router) { }

    ngOnInit(): void {
    }
    searchRecipe(value: string) {
        this.apiService.getRecipesByName(value).subscribe((data) => {
            console.log(data, "searchable");
        });
    }
    getRecipeDetails(recipe: any) {
        this.route.navigate(['/recipee', { data: JSON.stringify(recipe) }]);
    }
    
    loadRecipe(): void {
        this.apiService.getRecipesByName(`${this.recipe}`).subscribe(
            (data: any) => {
                console.log(data);

                this.recipes = data;
            },
            (error) => {
                console.log(error);
            }
        );
    }

}
