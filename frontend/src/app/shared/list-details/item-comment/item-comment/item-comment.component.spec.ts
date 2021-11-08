import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCommentComponent } from './item-comment.component';

describe('ItemCommentComponent', () => {
  let component: ItemCommentComponent;
  let fixture: ComponentFixture<ItemCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
