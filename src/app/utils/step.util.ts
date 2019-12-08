import { Step } from '../interfaces/recipe/step.interface';

export class StepUtil {

  public static createEmpty(): Step {
    return {
      name: null,
      text: null
    }
  }
}
