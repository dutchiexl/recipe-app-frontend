import { Item } from '../interfaces/recipe/item.interface';

export class ItemUtil {

  public static createEmpty(): Item {
    return {
      ingredient: undefined,
      unit: undefined,
      amount: undefined,
    }
  }
}
