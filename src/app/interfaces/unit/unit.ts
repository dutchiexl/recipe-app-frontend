import { Metric } from '../../enums/metric';

export interface Unit {
  id: string;
  name: string;
  metric: Metric;
  isParent: boolean;
  parenUnit?: Unit;
  parentRatio?: number;
  synonyms: string[];
}
