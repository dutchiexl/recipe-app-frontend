import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Unit } from '../interfaces/unit/unit';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';

export class RecipeValidator {
    static isUnit(units: Unit[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && control.value.id) {
                const selectedUnit = units.find((unit) => unit.id === control.value.id);
                if (selectedUnit) {
                    return null;
                }
            }
            return {
                invalid: true
            };
        };
    }

    static isIngredient(ingredients: Ingredient[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && control.value.id) {
                const selectedUnit = ingredients.find((ingredient) => ingredient.id === control.value.id);
                if (selectedUnit) {
                    return null;
                }
            }
            return {
                invalid: true
            };
        };
    }
}
