import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    recipes: any[] = [];
    cocktails: any[] = [];

    constructor(private route: Router,
        private apiService: ApiService,
        private auth: AuthService) {
        const sub = this.auth.user.subscribe(user => {
            this.auth.userID = user?.uid;
            sub.unsubscribe();
        })
    }

    ngOnInit(): void {
        this.apiService.getRecipesByName("Fried Apple Pie").subscribe(
            (data: any) => {
                this.recipes = data;
            },
            (error) => {
                console.log(error);
            }
        );
        this.apiService.getCocktailsByName("banana").subscribe(
            (data: any) => {
                this.cocktails = data;
            },
            (error) => {
                console.log(error);
            }
        );


    }
    getRecipeDetails(recipe: any) {
        if (this.auth.userID) {
            this.route.navigate(['/recipe-details', { data: JSON.stringify(recipe) }]);
        } else {
            this.route.navigate(['/login']); 
        }
    }
}
