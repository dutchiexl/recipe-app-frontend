import { environment } from 'src/environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { RecipeUtil } from '../../../utils/recipe.util';
import { Store } from '@ngxs/store';
import { StepUtil } from '../../../utils/step.util';
import { HttpClient } from '@angular/common/http';
import { AppState } from '../../../store/app.state';
import { RecipeListUtil } from '../../../utils/recipe-list.util';
import { ActivatedRoute } from '@angular/router';
import { Step } from '../../../interfaces/recipe/step.interface';
import { Item } from '../../../interfaces/recipe/item.interface';
import { ItemUtil } from '../../../utils/item.util';
import { UpdateOrCreateRecipeAction } from '../../../store/app.actions';
import { AssetUtil } from '../../../utils/asset.util';
import { RecipeCategory } from '../../../interfaces/recipe/recipe-category';

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
    preview = AssetUtil.getPlaceholder();
    selectedCategories: RecipeCategory[];
    @ViewChild('fileInput', {static: true}) fileInput: ElementRef;

    constructor(
        private store: Store,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        const recipeIdParameter = this.route.snapshot.paramMap.get('recipeId');
        if (recipeIdParameter) {
            this.recipe = RecipeListUtil.findRecipeById(this.store.selectSnapshot(AppState.getRecipes), recipeIdParameter);

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

    submitForm() {
        if (this.form.valid) {
            const recipeToSubmit = RecipeUtil.createEmpty();
            recipeToSubmit.name = this.form.get('name').value;
            recipeToSubmit.nameAddition = this.form.get('nameAddition').value;
            recipeToSubmit.description = this.form.get('description').value;
            recipeToSubmit.items = this.cleanItems(this.form.get('items').value);
            recipeToSubmit.steps = this.cleanSteps(this.form.get('steps').value);
            recipeToSubmit.imagePath = this.form.get('imagePath').value;
            recipeToSubmit.categories = this.selectedCategories;

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
        // @TODO: Put upload in centralised service
        const file = (event.target as HTMLInputElement).files[0];

        const formData = new FormData();
        formData.append('image', file);

        this.http.post(environment.apiUrl + 'api/upload', formData)
            .subscribe((response) => {
                const filename = AssetUtil.getFilenameFromPath(response['fileName']);
                this.preview = filename;
                this.form.patchValue({
                    imagePath: filename
                });
                this.form.get('imagePath').updateValueAndValidity();
            });
    }

    private createForm() {
        this.form = this.formBuilder.group({
            name: [this.recipe.name, Validators.required],
            nameAddition: [this.recipe.nameAddition, Validators.required],
            description: [this.recipe.description, Validators.required],
            imagePath: [this.recipe.imagePath, Validators.required],
            items: this.itemFormGroup,
            steps: this.stepFormGroup,
            categories: [this.recipe.categories],
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

    private cleanItems(items: Item[]) {
        return items.filter((item) => {
            return !!item.ingredient && !!item.amount && !!item.unit;
        });
    }

    private cleanSteps(steps: Step[]) {
        return steps.filter((step) => {
            return !!step.text && !!step.name;
        });
    }

    setCategories(categories: RecipeCategory[]) {
        this.selectedCategories = categories;
    }
}
