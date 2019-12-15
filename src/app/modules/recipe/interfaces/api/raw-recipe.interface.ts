import { RawStep } from './raw-step.interface';
import { RawItem } from './raw-item.interface';
import { RawRecipeCategory } from './raw-recipe-category.interface';

export interface RawRecipe {
    _id?: string;
    name: string;
    nameAddition: string;
    description: string;
    imagePath?: string;
    createdAt?: Date;
    steps: RawStep[];
    items: RawItem[];
    categories: RawRecipeCategory[];
    nutrients: [];
    equipment: [];
}
