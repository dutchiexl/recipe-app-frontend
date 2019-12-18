import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeItemNoDescriptionComponent } from './recipe-item-no-description.component';

describe('RecipeItemNoDescriptionComponent', () => {
  let component: RecipeItemNoDescriptionComponent;
  let fixture: ComponentFixture<RecipeItemNoDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeItemNoDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeItemNoDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
