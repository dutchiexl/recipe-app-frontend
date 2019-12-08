import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ingredient } from '../../../../interfaces/recipe/ingredient.interface';
import { RecipeState } from '../../../../store/recipe.state';
import { Store } from '@ngxs/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateIngredientAction } from '../../../../store/recipe.actions';
import { IngredientCategory } from '../../../../interfaces/recipe/ingredient-category';
import { find, map } from 'rxjs/operators';

@Component({
  selector: 'app-create-ingredient',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateIngredientComponent implements OnInit {
  ingredients: Ingredient[];
  ingredientCategories: IngredientCategory[];
  @Input() ingredient: Ingredient;
  ingredientForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateIngredientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ingredient) {
    this.ingredient = data;
    this.store.select(RecipeState.getIngredients).subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
    this.store.select(RecipeState.getIngredientCategories).subscribe((categories) => {
      this.ingredientCategories = categories;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.ingredientForm = this.formBuilder.group({
      name: [this.ingredient.name, Validators.required],
      category: [this.ingredient.category, Validators.required],
    });
  }

  onCreateClick() {
    if (this.ingredientForm.valid) {
      this.store.select(RecipeState.getIngredients).pipe(
        find((ingredients) => {
          return ingredients.some((ingredient) => {
            return ingredient.name === this.ingredientForm.get('name').value
          })
        }),
        map((ingredients) => {
          return ingredients.find((ingredient) => {
            return ingredient.name === this.ingredientForm.get('name').value
          })
        })
      ).subscribe((ingredient) => {
        this.dialogRef.close(ingredient);
      });

      this.ingredient.name = this.ingredientForm.get('name').value;
      this.ingredient.category = this.ingredientForm.get('category').value;

      this.store.dispatch(new CreateIngredientAction(this.ingredient));
    }
  }
}
