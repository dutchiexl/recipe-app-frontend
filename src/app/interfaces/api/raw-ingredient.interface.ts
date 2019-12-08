import { IngredientCategory } from '../recipe/ingredient-category';

export interface RawIngredient {
  _id?: string;
  name: string,
  category: IngredientCategory
}
