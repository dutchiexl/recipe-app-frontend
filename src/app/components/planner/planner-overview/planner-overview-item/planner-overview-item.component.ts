import { Component, Input, OnInit } from '@angular/core';
import { MealPlan } from '../../../../interfaces/planner/meal-plan';

@Component({
  selector: 'app-planner-overview-item',
  templateUrl: './planner-overview-item.component.html',
  styleUrls: ['./planner-overview-item.component.scss']
})
export class PlannerOverviewItemComponent implements OnInit {
  @Input() mealPlan: MealPlan;

  constructor() { }

  ngOnInit() {
  }

}
