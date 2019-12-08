import { Unit } from '../unit/unit';
import { Ingredient } from './ingredient.interface';

export interface Item {
  ingredient: Ingredient;
  amount: number;
  unit: Unit;
}
