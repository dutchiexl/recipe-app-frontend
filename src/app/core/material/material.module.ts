import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule
} from '@angular/material';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatSelectModule,
        EcoFabSpeedDialModule
    ],
    exports: [
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatListModule,
        MatDialogModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatSelectModule,
        EcoFabSpeedDialModule
    ]
})
export class MaterialModule {
}
