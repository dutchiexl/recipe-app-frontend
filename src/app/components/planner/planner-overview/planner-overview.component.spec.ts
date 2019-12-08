import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerOverviewComponent } from './planner-overview.component';

describe('PlannerOverviewComponent', () => {
  let component: PlannerOverviewComponent;
  let fixture: ComponentFixture<PlannerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
