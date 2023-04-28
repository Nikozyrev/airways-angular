import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDateInputComponent } from './single-date-input.component';

describe('SingleDateInputComponent', () => {
  let component: SingleDateInputComponent;
  let fixture: ComponentFixture<SingleDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleDateInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
