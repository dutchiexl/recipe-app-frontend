import { RawStep } from './raw-step.interface';
import { RawItem } from './raw-item.interface';

export interface RawRecipe{
  _id?: string,
  name: string,
  nameAddition: string,
  description: string,
  imagePath?: string,
  creationDate: Date,
  steps: RawStep[],
  items: RawItem[],
  nutrients: [],
  equipment: []
}
