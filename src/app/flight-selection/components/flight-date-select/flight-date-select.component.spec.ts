import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDateSelectComponent } from './flight-date-select.component';

describe('FlightDateSelectComponent', () => {
  let component: FlightDateSelectComponent;
  let fixture: ComponentFixture<FlightDateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightDateSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlightDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
