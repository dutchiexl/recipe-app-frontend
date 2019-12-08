import { Ingredient } from '../recipe/ingredient.interface';
import { Unit } from '../unit/unit';

export interface ShoppinglistItem {
  amount: number;
  ingredient: Ingredient;
  unit: Unit;
}
