import { Unit } from '../unit/unit';

export interface RawUnit {
  _id: string,
  name: string,
  metric: string,
  isParent: boolean,
  parentUnit?: Unit,
  parentRatio?: number,
  synonyms?: string[]
}
