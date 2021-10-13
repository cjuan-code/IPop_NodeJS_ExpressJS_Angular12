import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollCategoriesComponent } from './scroll-categories.component';

describe('ScrollCategoriesComponent', () => {
  let component: ScrollCategoriesComponent;
  let fixture: ComponentFixture<ScrollCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
