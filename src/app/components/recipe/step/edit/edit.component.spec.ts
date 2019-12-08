import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStepComponent } from './edit.component';

describe('EditComponent', () => {
  let component: EditStepComponent;
  let fixture: ComponentFixture<EditStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
