import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  RecipebaseUrl: string = environment.RecipesninjaApi;
  CocktailbaseUrl: string = environment.CocktailsninjaApi;

  constructor(public http: HttpClient) {}

  getRecipesByName(name: string) {
    const headers = new HttpHeaders().append(
      'x-Api-key',
      'CIckCSgByIWKRq1fhZGTAg==yFTKTPQRlEUONEQc'
    );
    let data = this.http.get(`https://api.api-ninjas.com/v1/recipe?query= ${name}`,{
        headers,
      }
    );
    return data;
  }

  getCocktailssByName(name: string) {
    const headers = new HttpHeaders().append('x-Api-key','CIckCSgByIWKRq1fhZGTAg==yFTKTPQRlEUONEQc'
    );
    let data = this.http.get(`https://api.api-ninjas.com/v1/cocktail?query= ${name}`,{
        headers,
      }
    );
    return data;
  }

  get(
    subUrl: string,
    options?: {
      headers?: HttpHeaders;
    }
  ) {
    return this.http.get(this.RecipebaseUrl + subUrl, {
      headers: options?.headers,
    });
  }
}
