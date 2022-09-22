import { ICocktail } from "./cocktail";
import { IRecipe } from "./recipe";

export interface IFavorite {
    id: string,
    type_id:  string,
    user_id: any,
    typeS: string,
    type: IRecipe | ICocktail,
}
