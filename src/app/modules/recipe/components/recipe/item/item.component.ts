import { Component, Input, OnInit } from '@angular/core';
import { ShoppinglistItem } from '../../../interfaces/shoppinglist/shoppinglist-item';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    @Input() item: ShoppinglistItem;

    constructor() {}

    ngOnInit() {
    }

}
