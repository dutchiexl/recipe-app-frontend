import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Confirmation} from "../../../interfaces/confirmation/confirmation.interface";
import {Store} from "@ngxs/store";
import {AppState} from "../../../store/app.state";
import {SharedUser} from "../../../interfaces/user/shared-user.interface";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {MatAutocompleteSelectedEvent} from "@angular/material/typings/autocomplete";
import {RecipeValidator} from "../../../validators/recipe.validator";

@Component({
    selector: 'app-share',
    templateUrl: './share.component.html',
    styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
    chosenUser: SharedUser = null;
    sharedUsers: SharedUser[] = [];
    filteredSharedUsers: SharedUser[] = [];
    searchSharedUserControl: FormControl;

    constructor(
        public dialogRef: MatDialogRef<ShareComponent>,
        private store: Store,
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: Confirmation) {
        this.store.select(AppState.getSharedUsers).subscribe((sharedUsers) => {
            this.sharedUsers = sharedUsers;
            this.filteredSharedUsers = [...this.sharedUsers];
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    displaySharedUser(sharedUser?: SharedUser): string | undefined {
        return sharedUser ? sharedUser.username : undefined;
    }

    ngOnInit() {
        this.searchSharedUserControl = this.formBuilder.control(null, [
            Validators.required,
            RecipeValidator.isSharedUser(this.sharedUsers)
        ]);
        this.searchSharedUserControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filter(name) : this.sharedUsers.slice())
            ).subscribe((sharedUsers: SharedUser[]) => {
            this.filteredSharedUsers = sharedUsers;
        });
    }

    _filter(name): SharedUser[] {
        return [...this.sharedUsers].filter((sharedUser) => {
            return sharedUser.username.toLowerCase().indexOf(name) === 0;
        });
    }

    share() {
        this.searchSharedUserControl.markAsTouched();
        if (this.searchSharedUserControl.valid) {
            this.dialogRef.close(this.chosenUser);
        }
    }

    selected($event: MatAutocompleteSelectedEvent) {
        const sharedUser: SharedUser = $event.option.value;
        this.chosenUser = sharedUser;
    }
}
