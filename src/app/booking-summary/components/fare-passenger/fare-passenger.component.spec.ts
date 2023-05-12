import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarePassengerComponent } from './fare-passenger.component';

describe('FarePassengerComponent', () => {
  let component: FarePassengerComponent;
  let fixture: ComponentFixture<FarePassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarePassengerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarePassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
