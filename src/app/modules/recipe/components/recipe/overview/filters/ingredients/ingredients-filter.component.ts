import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { AppState } from '../../../../../store/app.state';
import { Ingredient } from '../../../../../interfaces/recipe/ingredient.interface';
import { SetRecipeIngredientFilterValue } from '../../../../../store/app.actions';

@Component({
    selector: 'app-ingredients-filter',
    templateUrl: './ingredients-filter.component.html'
})
export class IngredientsFilterComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControl = new FormControl();
    filteredIngredients: Observable<Ingredient[]>;
    list: Ingredient[] = [];
    ingredients: Ingredient[];

    @ViewChild('ingredientInput', {static: false}) ingredientInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

    constructor(private store: Store) {
        this.ingredients = store.selectSnapshot(AppState.getIngredients);
        this.list = [...store.selectSnapshot(AppState.getRecipeFilters).ingredients];
        this.filteredIngredients = this.formControl.valueChanges.pipe(
            startWith(null),
            map((ingredientName: string | null) => {
                if (typeof ingredientName === 'string') {
                    return ingredientName ?
                        this._filter(ingredientName).filter(ingredient => -1 === this.list.indexOf(ingredient)) :
                        this.ingredients.filter(ingredient => -1 === this.list.indexOf(ingredient)).slice();
                }
            })
        );
    }

    ngOnInit(): void {
    }

    remove(ingredientToRemove: Ingredient): void {
        this.list = this.list.filter(ingredient => {
            return ingredient.name !== ingredientToRemove.name;
        });
        this.store.dispatch(new SetRecipeIngredientFilterValue([...this.list]));
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.list.push(event.option.value);
        this.store.dispatch(new SetRecipeIngredientFilterValue([...this.list]));
        this.ingredientInput.nativeElement.value = '';
        this.formControl.setValue(null);
    }

    private _filter(value: string): Ingredient[] {
        const filterValue = value.toLowerCase();

        return this.ingredients
            .filter(ingredient => ingredient.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
