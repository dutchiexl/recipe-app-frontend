import { MealPlan } from '../interfaces/planner/meal-plan';
import { Shoppinglist } from '../interfaces/shoppinglist/shoppinglist';
import { Item } from '../interfaces/recipe/item.interface';
import { ShoppinglistGroup } from '../interfaces/shoppinglist/shoppinglist-group';
import { UnitUtil } from './unit-util';
import { Store } from '@ngxs/store';
import { Unit } from '../interfaces/unit/unit';
import { RecipeState } from '../store/recipe.state';

export class ShoppingListUtil {
  public static convertMealplanToShoppingList(mealplan: MealPlan, units: Unit[]): Shoppinglist {
    let shoppingList: Shoppinglist = {
      shoppinglistGroups: []
    };
    mealplan.recipes.forEach((recipe) => {
      recipe.items.forEach((item) => {
        this.addIngredientToShoppingList(shoppingList, item, units);
      });
    });
    return shoppingList;
  }

  public static addIngredientToShoppingList(shoppingList: Shoppinglist, item: Item, units: Unit[]) {
    let shoppingListGroup = shoppingList.shoppinglistGroups.find(
      (shoppingListGroup) => shoppingListGroup.category.name === item.ingredient.category.name
    );
    if (!shoppingListGroup) {
      shoppingListGroup = {
        category: item.ingredient.category,
        shoppingListItems: []
      };
      shoppingList.shoppinglistGroups.push(shoppingListGroup);
    }
    this.addIngredientToShoppingListGroup(shoppingListGroup, item, units);
  }

  public static addIngredientToShoppingListGroup(shoppingListGroup: ShoppinglistGroup, item: Item, units: Unit[]) {
    let convertedItem = UnitUtil.convertItemstToMainUnit(item, units);
    let foundItem = shoppingListGroup.shoppingListItems.find((existingItem) => existingItem.ingredient.id === item.ingredient.id);
    if (foundItem) {
      foundItem.amount += convertedItem.amount;
    } else {
      shoppingListGroup.shoppingListItems.push({
        ingredient: convertedItem.ingredient,
        unit: convertedItem.unit,
        amount: convertedItem.amount
      });
    }
  }
}
