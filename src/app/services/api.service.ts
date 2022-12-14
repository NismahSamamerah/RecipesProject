import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    RecipebaseUrl: string = environment.RecipesninjaApi;
    CocktailbaseUrl: string = environment.CocktailsninjaApi;

    constructor(public http: HttpClient) { }

    getRecipesByName(name: string) {
        const headers = new HttpHeaders().append(
            'x-Api-key',
            'CIckCSgByIWKRq1fhZGTAg==yFTKTPQRlEUONEQc'
        );
        let data = this.http.get(`https://api.api-ninjas.com/v1/recipe?query= ${name}`, {
            headers,
        }
        );
        return data;
    }

    getCocktailsByName(name: string) {
        const headers = new HttpHeaders().append('x-Api-key', 'CIckCSgByIWKRq1fhZGTAg==yFTKTPQRlEUONEQc'
        );
        let data = this.http.get(`https://api.api-ninjas.com/v1/cocktail?name= ${name}`, {
            headers,
        }
        );
        return data;
    }

    getImage(name:string){
        return  this.http.get(`https://api.unsplash.com/search/photos?query=${name}&client_id=8K0tHboOVHmbsPgtyZeNyf4KUFtTk8sanX1sV_zC_mE`)
          }

    get(
        subUrl: string,
        options?: {
            params?: HttpParams;
        }
    ) {
        return this.http.get(this.RecipebaseUrl + subUrl, {
            params: options?.params,
        });
    }
}
