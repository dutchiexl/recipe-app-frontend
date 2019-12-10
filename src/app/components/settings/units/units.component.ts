import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RecipeState } from '../../../store/recipe.state';
import { Unit } from '../../../interfaces/unit/unit';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
    private units: Unit[];

    constructor(private store: Store) {
        store.select(RecipeState.getUnits).subscribe((units) => {
            this.units = units;
        });
    }

    ngOnInit() {
    }

    createUnit() {

    }
}
