import { Component, Input, OnInit } from '@angular/core';
import { ShoppinglistGroup } from '../../../interfaces/shoppinglist/shoppinglist-group';

@Component({
  selector: 'app-shoppinglist-group',
  templateUrl: './shoppinglist-group.component.html',
  styleUrls: ['./shoppinglist-group.component.scss']
})
export class ShoppinglistGroupComponent implements OnInit {
  @Input() shoppingListGroup: ShoppinglistGroup;

  constructor() { }

  ngOnInit() {
  }

}
