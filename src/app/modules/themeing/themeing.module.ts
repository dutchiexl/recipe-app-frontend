import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeOverviewComponent } from './components/recipe-overview/recipe-overview.component';
import { MaterialModule } from '../../core/material/material.module';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { RecipeItemNoDescriptionComponent } from './components/recipe-item-no-description/recipe-item-no-description.component';
import { RecipeLoginComponent } from './components/login/login.component';
import { RecipeEditComponent } from './components/recipe-edit/recipe-edit.component';


@NgModule({
    declarations: [
        RecipeOverviewComponent,
        RecipeItemComponent,
        RecipeItemNoDescriptionComponent,
        RecipeLoginComponent,
        RecipeEditComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class ThemeingModule {
}
