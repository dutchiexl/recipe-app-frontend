import { RawStep } from './raw-step.interface';
import { RawItem } from './raw-item.interface';

export interface RawRecipe {
    _id?: string,
    name: string,
    nameAddition: string,
    description: string,
    imagePath?: string,
    createdAt?: Date,
    steps: RawStep[],
    items: RawItem[],
    nutrients: [],
    equipment: []
}
