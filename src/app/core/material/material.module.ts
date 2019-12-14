import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
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
        MatSidenavModule,
        MatChipsModule,
        EcoFabSpeedDialModule
    ]
})
export class MaterialModule {
}
