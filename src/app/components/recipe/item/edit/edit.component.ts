import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Unit } from '../../../../interfaces/unit/unit';
import { RecipeState } from '../../../../store/recipe.state';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ItemUtil } from '../../../../utils/item.util';
import { Item } from '../../../../interfaces/recipe/item.interface';
import { Ingredient } from '../../../../interfaces/recipe/ingredient.interface';
import { IngredientUtil } from '../../../../utils/ingredient.util';
import { MatDialog } from '@angular/material';
import { CreateIngredientComponent } from '../../ingredient/create/create.component';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditItemComponent),
      multi: true
    }
  ]
})
export class EditItemComponent implements ControlValueAccessor, OnChanges, OnInit {
  @Input() item: Item;
  formItem: Item = ItemUtil.createEmpty();
  @Output() addItem = new EventEmitter();
  itemForm: FormGroup;
  enteredValue: string;

  units: Unit[];
  ingredients: Ingredient[];
  filteredUnits: Observable<Unit[]>;
  filteredIngredients: Observable<Ingredient[]>;

  onChange = (item: Item) => {};

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.store.select(RecipeState.getUnits).subscribe((units) => {
      this.units = units;
    });
    this.store.select(RecipeState.getIngredients).subscribe((ingredients) => {
      this.ingredients = ingredients;
    });
  }

  ngOnInit() {
    this.formItem.ingredient = this.item.ingredient ? this.item.ingredient : null;
    this.formItem.unit = this.item.unit ? this.item.unit : null;
    this.formItem.amount = this.item.amount ? Number(this.item.amount) : null;

    this.itemForm = this.formBuilder.group({
      ingredient: [this.item.ingredient, Validators.required],
      unit: [this.item.unit, Validators.required],
      amount: [this.item.amount, [Validators.required]]
    });

    this.filteredUnits = this.itemForm.get('unit').valueChanges.pipe(
      startWith(''),
      map(value => this._filterUnits(value))
    );

    this.filteredIngredients = this.itemForm.get('ingredient').valueChanges.pipe(
      startWith(''),
      map(value => this._filterIngredients(value))
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    //this.onChange(obj);
  }

  private _filterUnits(value: string): Unit[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      return this.units.filter(option => option.name.toLowerCase().includes(filterValue));
    }
  }

  private _filterIngredients(value: string): Ingredient[] {
    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();

      let ingredients = this.ingredients.filter(option => option.name.toLowerCase().includes(filterValue));
      if (ingredients.length < 1) {
        let newIngredient = IngredientUtil.createEmpty();
        this.enteredValue = value;
        newIngredient.name = `Add '${value}'?`;
        ingredients = [newIngredient];
      }
      return ingredients;
    }
  }

  displayUnit() {
    return (unit: Unit) => {
      if (unit) {
        return unit.name;
      }
      return '';
    };
  }

  displayIngredient() {
    return (ingredient: Ingredient) => {
      if (ingredient) {
        return ingredient.name;
      }
      return '';
    };
  }

  updateUnit(unit: Unit) {
    this.itemForm.get('unit').setValue(unit);
    this.updateItem(null);
  }

  updateIngredient(ingredient: Ingredient) {
    if (!ingredient.id) {
      this.openCreateDialog(ingredient);
    } else {
      this.itemForm.get('ingredient').setValue(ingredient);
      this.updateItem(null);
    }
  }

  updateItem($event: Event) {
    this.formItem.ingredient = this.itemForm.get('ingredient').value;
    this.formItem.unit = this.itemForm.get('unit').value;
    this.formItem.amount = this.itemForm.get('amount').value;
    this.onChange(this.formItem);
  }

  private openCreateDialog(ingredient: Ingredient) {
    ingredient.name = this.enteredValue;
    const dialogRef = this.dialog.open(CreateIngredientComponent, {
      width: '400px',
      data: ingredient
    });

    dialogRef.afterClosed().subscribe(ingredient => {
      if (ingredient) {
        this.itemForm.get('ingredient').setValue(ingredient);
        this.updateItem(null);
      }
    });
  }
}
