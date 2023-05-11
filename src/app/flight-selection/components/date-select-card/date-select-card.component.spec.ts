import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSelectCardComponent } from './date-select-card.component';

describe('DateSelectCardComponent', () => {
  let component: DateSelectCardComponent;
  let fixture: ComponentFixture<DateSelectCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateSelectCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateSelectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
