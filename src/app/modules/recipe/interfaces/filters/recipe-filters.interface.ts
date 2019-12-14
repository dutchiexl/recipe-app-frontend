import { Ingredient } from '../recipe/ingredient.interface';

export interface RecipeFilters {
    search: string;
    ingredients: Ingredient[];
}
