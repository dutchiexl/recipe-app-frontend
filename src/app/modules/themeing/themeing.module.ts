import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeOverviewComponent } from './components/recipe-overview/recipe-overview.component';
import { MaterialModule } from '../../core/material/material.module';


@NgModule({
    declarations: [RecipeOverviewComponent],
    imports: [
        CommonModule,
        MaterialModule
    ]
})
export class ThemeingModule {
}
