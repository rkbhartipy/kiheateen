import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccVerifiedComponent } from './acc-verified.component';

describe('AccVerifiedComponent', () => {
  let component: AccVerifiedComponent;
  let fixture: ComponentFixture<AccVerifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccVerifiedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccVerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
