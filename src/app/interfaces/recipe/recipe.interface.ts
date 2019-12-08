import { Step } from './step.interface';
import { Item } from './item.interface';

export interface Recipe {
  id?: string,
  name: string
  nameAddition: string;
  description: string;
  imagePath?: string;
  source?: string;
  steps: Step[];
  items: Item[];
  equipment: [];
  creationDate: Date;
}
