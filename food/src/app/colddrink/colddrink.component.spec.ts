import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColddrinkComponent } from './colddrink.component';

describe('ColddrinkComponent', () => {
  let component: ColddrinkComponent;
  let fixture: ComponentFixture<ColddrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColddrinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColddrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
