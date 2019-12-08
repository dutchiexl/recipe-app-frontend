import { Metric } from '../enums/metric';

export class MetricMapper {

  public static toModel(rawMetric: string): Metric {
    switch (rawMetric) {
      case 'weight':
        return Metric.WEIGHT;
        break;
      case'volume':
        return Metric.VOLUME;
    }
  }
}
