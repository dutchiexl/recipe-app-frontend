import { IngredientCategory } from '../../enums/ingredient-category';
import { Item } from '../recipe/item.interface';
import { ShoppinglistItem } from './shoppinglist-item';

export interface ShoppinglistGroup {
  category: IngredientCategory;
  shoppingListItems: ShoppinglistItem[];
}
