import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule, MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule, MatTableModule,
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
        MatSidenavModule,
        MatChipsModule,
        EcoFabSpeedDialModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatTableModule
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
        MatSidenavModule,
        MatChipsModule,
        EcoFabSpeedDialModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatTableModule
    ]
})
export class MaterialModule {
}
