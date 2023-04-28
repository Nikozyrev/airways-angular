import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenshipInputComponent } from './citizenship-input.component';

describe('CitizenshipInputComponent', () => {
  let component: CitizenshipInputComponent;
  let fixture: ComponentFixture<CitizenshipInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitizenshipInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitizenshipInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
