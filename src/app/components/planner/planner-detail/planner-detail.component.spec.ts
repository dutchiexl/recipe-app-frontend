import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDetailComponent } from './planner-detail.component';

describe('PlannerDetailComponent', () => {
  let component: PlannerDetailComponent;
  let fixture: ComponentFixture<PlannerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlannerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
