import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerOverviewItemComponent } from './planner-overview-item.component';

describe('PlannerOverviewItemComponent', () => {
  let component: PlannerOverviewItemComponent;
  let fixture: ComponentFixture<PlannerOverviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerOverviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
