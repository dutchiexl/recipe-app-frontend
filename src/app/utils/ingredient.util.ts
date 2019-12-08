import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import { RawIngredient } from '../interfaces/api/raw-ingredient.interface';

export class IngredientUtil {

  public static createEmpty(): Ingredient {
    return {
      name: undefined,
      category: undefined
    }
  }

  static asJson(ingredient: Ingredient): RawIngredient {
    return {
      name: ingredient.name,
      category: ingredient.category
    }
  }
}
