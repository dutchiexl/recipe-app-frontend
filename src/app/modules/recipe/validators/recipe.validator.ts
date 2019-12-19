import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Unit } from '../interfaces/unit/unit';
import { Ingredient } from '../interfaces/recipe/ingredient.interface';
import {SharedUser} from "../interfaces/user/shared-user.interface";

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
                return null;
            }
            return {
                invalid: true
            };
        };
    }

    static isSharedUser(sharedUsers: SharedUser[]): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (control.value && control.value.id) {
                const selectedSharedUser = sharedUsers.find((sharedUser: SharedUser) => sharedUser.id === control.value.id);
                if (selectedSharedUser) {
                    return null;
                }
            }
            return {
                invalid: true
            };
        };
    }
}
