import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { RecipeUtil } from '../../../utils/recipe.util';
import { Store } from '@ngxs/store';
import { StepUtil } from '../../../utils/step.util';
import { HttpClient } from '@angular/common/http';
import { RecipeState } from '../../../store/recipe.state';
import { RecipeListUtil } from '../../../utils/recipe-list.util';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../../../interfaces/recipe/step.interface';
import { Item } from '../../../interfaces/recipe/item.interface';
import { ItemUtil } from '../../../utils/item.util';
import { UpdateOrCreateRecipeAction } from '../../../store/recipe.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  recipe: Recipe;
  form: FormGroup;
  itemFormGroup: FormArray = new FormArray([]);
  stepFormGroup: FormArray = new FormArray([]);
  preview = '/images/placeholder.jpg';
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

  constructor(
    private store: Store,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let recipeIdParameter = this.route.snapshot.paramMap.get('recipeId');
    if (recipeIdParameter) {
      let recipeIdParameter = this.route.snapshot.paramMap.get('recipeId');
      this.recipe = RecipeListUtil.findRecipeById(this.store.selectSnapshot(RecipeState.getRecipes), recipeIdParameter);

      if (this.recipe) {
        if (this.recipe.imagePath) {
          this.preview = this.recipe.imagePath;
        }
      }
    } else {
      this.recipe = RecipeUtil.createEmpty();
    }
    this.createForm();
    this.createItemForm();
    this.createStepsForm();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: [this.recipe.name, Validators.required],
      nameAddition: [this.recipe.nameAddition, Validators.required],
      description: [this.recipe.description, Validators.required],
      imagePath: [this.recipe.imagePath, Validators.required],
      items: this.itemFormGroup,
      steps: this.stepFormGroup
    });
  }

  private createItemForm() {
    this.recipe.items.forEach((item) => {
      this.itemFormGroup.push(new FormControl(item, Validators.required));
    });
  }

  private createStepsForm() {
    this.recipe.steps.forEach((step) => {
      this.stepFormGroup.push(new FormControl(step, Validators.required));
    });
  }

  submitForm() {
    if (this.form.valid) {
      let recipeToSubmit = RecipeUtil.createEmpty();
      recipeToSubmit.name = this.form.get('name').value;
      recipeToSubmit.nameAddition = this.form.get('nameAddition').value;
      recipeToSubmit.description = this.form.get('description').value;
      recipeToSubmit.items = this.cleanItems(this.form.get('items').value);
      recipeToSubmit.steps = this.cleanSteps(this.form.get('steps').value);
      recipeToSubmit.imagePath = this.form.get('imagePath').value;

      if (this.recipe.id) {
        recipeToSubmit.id = this.recipe.id;
      }
      this.store.dispatch(new UpdateOrCreateRecipeAction(recipeToSubmit));
    }
  }

  addItem() {
    const item = ItemUtil.createEmpty();
    this.itemFormGroup.push(new FormControl(item, Validators.required));
  }

  addStep() {
    const step = StepUtil.createEmpty();
    this.stepFormGroup.push(new FormControl(step, Validators.required));
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);

    let formData = new FormData();
    formData.append('image', file);

    this.http.post('/api/upload', formData)
      .subscribe((response) => {
        let filename = response['fileName'].split('/');
        this.form.patchValue({
          imagePath: '/images/' + filename[filename.length - 1]
        });
        this.form.get('imagePath').updateValueAndValidity();
      })
  }

  private cleanItems(items: Item[]) {
    return items.filter((item) => {
      return !!item.ingredient && !!item.amount && !!item.unit;
    })
  }

  private cleanSteps(steps: Step[]) {
    return steps.filter((step) => {
      return !!step.text && !!step.name;
    })
  }
}
