import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { RecipeCategory } from '../../../../interfaces/recipe/recipe-category';
import { AppState } from '../../../../store/app.state';

@Component({
    selector: 'app-recipe-category-picker',
    templateUrl: './recipe-category-picker.component.html'
})
export class RecipeCategoryPickerComponent implements OnInit {
    @Input() currentCategories: RecipeCategory[] = [];
    list: RecipeCategory[] = [];
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControl = new FormControl();
    filteredCategories: Observable<RecipeCategory[]>;
    categories: RecipeCategory[];

    @ViewChild('categoryInput', {static: false}) categoryInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

    constructor(private store: Store) {
        this.categories = store.selectSnapshot(AppState.getRecipeCategories);
        this.list = [...this.currentCategories];
        this.filteredCategories = this.formControl.valueChanges.pipe(
            startWith(null),
            map((ingredientName: string | null) => {
                if (typeof ingredientName === 'string') {
                    return ingredientName ?
                        this._filter(ingredientName).filter(ingredient => -1 === this.list.indexOf(ingredient)) :
                        this.categories.filter(ingredient => -1 === this.list.indexOf(ingredient)).slice();
                }
            })
        );
    }

    ngOnInit(): void {
    }

    remove(categoryToRemove: RecipeCategory): void {
        this.list = this.list.filter(category => {
            return category.name !== categoryToRemove.name;
        });
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.list.push(event.option.value);
        this.categoryInput.nativeElement.value = '';
        this.formControl.setValue(null);
    }

    private _filter(value: string): RecipeCategory[] {
        const filterValue = value.toLowerCase();

        return this.categories
            .filter(category => category.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
