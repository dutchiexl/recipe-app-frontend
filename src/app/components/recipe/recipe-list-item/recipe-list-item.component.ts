import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../interfaces/recipe/recipe.interface';
import { AssetUtil } from '../../../utils/asset.util';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss']
})
export class RecipeListItemComponent implements OnInit {
  assetUtil = AssetUtil;
  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}
