import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppinglistGroupComponent } from './shoppinglist-group.component';

describe('ShoppinglistGroupComponent', () => {
  let component: ShoppinglistGroupComponent;
  let fixture: ComponentFixture<ShoppinglistGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppinglistGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppinglistGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
