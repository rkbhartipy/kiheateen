import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndSuggestionComponent } from './review-and-suggestion.component';

describe('ReviewAndSuggestionComponent', () => {
  let component: ReviewAndSuggestionComponent;
  let fixture: ComponentFixture<ReviewAndSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAndSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewAndSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
