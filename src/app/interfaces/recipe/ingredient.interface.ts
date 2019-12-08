import { IngredientCategory } from './ingredient-category';

export interface Ingredient {
  id?: string;
  name: string;
  category: IngredientCategory
}
