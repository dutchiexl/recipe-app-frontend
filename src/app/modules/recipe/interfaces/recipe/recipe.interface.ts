import { Step } from './step.interface';
import { Item } from './item.interface';
import { RecipeCategory } from './recipe-category';

export interface Recipe {
    id?: string;
    name: string;
    nameAddition?: string;
    description: string;
    imagePath?: string;
    serves: number;
    source?: string;
    steps: Step[];
    items: Item[];
    categories: RecipeCategory[];
    equipment: [];
    creationDate: Date;
    userId: string;
}
