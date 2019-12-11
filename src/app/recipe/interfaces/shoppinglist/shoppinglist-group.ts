import { IngredientCategory } from '../../enums/ingredient-category';
import { ShoppinglistItem } from './shoppinglist-item';

export interface ShoppinglistGroup {
    category: IngredientCategory;
    shoppingListItems: ShoppinglistItem[];
}
