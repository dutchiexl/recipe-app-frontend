import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../../interfaces/recipe/step.interface';
import { AssetUtil } from '../../../utils/asset.util';

@Component({
    selector: 'app-step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
    @Input() step: Step;

    constructor() { }

    ngOnInit() {
        console.log(this.step);
    }

    getImagePath() {
        return ` url('${AssetUtil.getAssetUrl(this.step.imagePath)}')`;
    }
}
