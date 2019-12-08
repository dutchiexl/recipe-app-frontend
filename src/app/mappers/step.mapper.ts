import { RawStep } from '../interfaces/api/raw-step.interface';
import { Step } from '../interfaces/recipe/step.interface';

export class StepMapper {

  public static toModel(rawStep: RawStep): Step {
    let step: Step = {
      name: rawStep.name,
      text: rawStep.text,
    };

    if (rawStep.imagePath) {
      step.imagePath = rawStep.imagePath;
    }

    return step;
  }
}
