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
    getImages(name: string) {
        return this.http.get(`https://api.unsplash.com/photos?query=${name}&client_id=JEyCXkuqJSigTZ95jQDe_SECbBf1B5AKsTmtxOkC5-Q`)
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
