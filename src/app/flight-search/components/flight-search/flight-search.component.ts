import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setTiketInfoSuccess } from '../../store/actions/tiket.action';
import { TiketStateInterface } from '../../store/tiket.state.model';
import { dateValidator } from '../../../shared/validators/date.validator';
import { tiketValidator } from '../../../shared/validators/tiket.validator';
import { selectDate } from '../../../header/store/selectors/header-selector';

export interface Toppings {
  type: string;
  amount: number;
}

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {
  selectedType!: string;

  tripType: string[] = ['Round Trip', 'One Way'];

  countries = ['Ireland', 'Finland', 'England', 'Denmark']; //swith to api countries

  toppings = new FormControl(['']);

  toppingsObj: Toppings[] = [
    {
      type: 'Adult',
      amount: 0,
    },
    {
      type: 'Child',
      amount: 0,
    },
    {
      type: 'Infant',
      amount: 0,
    },
  ];

  clickCounter = 0;

  angle = 0;

  tiketForm = new FormGroup({
    tripType: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required, dateValidator]),
    endDate: new FormControl(''),
    toppings: new FormControl(this.toppingsObj, [tiketValidator]),
  });

  @ViewChild('fromInput') btnInput!: ElementRef;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedType = this.tripType[0];
    const date$ = this.store.select(selectDate);
    date$.subscribe(() => {
      const endDate = this.tiketForm.get('endDate')?.value;
      const startDate = this.tiketForm.get('startDate')?.value;
      this.tiketForm.get('endDate')?.setValue(endDate as string);
      this.tiketForm.get('startDate')?.setValue(startDate as string);
    });
    this.tiketForm.get('toppings')?.markAsTouched();
  }

  change() {
    const fromInclude =
      this.btnInput.nativeElement.previousElementSibling.querySelector(
        '.label'
      ).textContent;
    const toInclude =
      this.btnInput.nativeElement.nextElementSibling.querySelector(
        '.label'
      ).textContent;
    const rotate = fromInclude;

    this.btnInput.nativeElement.previousElementSibling.querySelector(
      '.label'
    ).textContent = toInclude;
    this.btnInput.nativeElement.nextElementSibling.querySelector(
      '.label'
    ).textContent = rotate;
    if (this.clickCounter === 0) {
      (
        this.btnInput.nativeElement.previousElementSibling as HTMLElement
      ).style.transform = 'translateY(60px)';
      (
        this.btnInput.nativeElement.nextElementSibling as HTMLElement
      ).style.transform = 'translateY(-60px)';
      this.clickCounter++;
    } else {
      (
        this.btnInput.nativeElement.previousElementSibling as HTMLElement
      ).style.transform = 'translateY(0)';
      (
        this.btnInput.nativeElement.nextElementSibling as HTMLElement
      ).style.transform = 'translateY(0)';
      this.clickCounter--;
    }
    this.angle -= 180;
  }

  submit() {
    if (this.tiketForm.valid) {
      const formValue: TiketStateInterface = Object.assign(
        {},
        this.tiketForm.value as TiketStateInterface
      );
      if (this.clickCounter > 0) {
        formValue.from = this.tiketForm.get('to')?.value as string;
        formValue.to = this.tiketForm.get('from')?.value as string;
      }
      if (this.selectedType === 'Round Trip') {
        this.store.dispatch(
          setTiketInfoSuccess({
            tiketInfo: formValue,
          })
        );
        return;
      } else {
        this.store.dispatch(
          setTiketInfoSuccess({
            tiketInfo: formValue,
          })
        );
      }
    }
  }

  increase(event: Event) {
    const elValue = (event.target as HTMLElement)
      .nextElementSibling as HTMLElement;
    const value = Number(elValue.innerHTML) + 1;
    elValue.innerHTML = value.toString();
    const tiketName = (
      ((event.target as HTMLElement).parentElement as HTMLElement)
        .previousElementSibling as HTMLElement
    ).textContent as string;
    const array = this.toppings.value;
    if (!array?.includes(tiketName)) {
      array?.push(tiketName);
    }

    this.toppings.patchValue(array);

    this.toppingsObj.forEach((val) => {
      if (val.type === tiketName) {
        val.amount = value;
      }
    });

    this.tiketForm.get('toppings')?.setValue(this.toppingsObj);
  }

  decrease(event: Event) {
    const elValue = (event.target as HTMLElement)
      .previousElementSibling as HTMLElement;
    let value = elValue.innerHTML;
    if (+value > 0) {
      value = (+value - 1).toString();
    }
    elValue.innerHTML = value;

    const tiketName = (
      ((event.target as HTMLElement).parentElement as HTMLElement)
        .previousElementSibling as HTMLElement
    ).textContent as string;
    const array = this.toppings.value;

    if (+value === 0) {
      const filterArray = (array as string[]).filter((el) => el !== tiketName);
      this.toppings.setValue(filterArray);
    }

    this.toppingsObj.forEach((val) => {
      if (val.type === tiketName) {
        val.amount = +value;
      }
    });

    this.tiketForm.get('toppings')?.setValue(this.toppingsObj);
  }

  tripTypeChange() {
    this.tiketForm.get('endDate')?.setValue(null);
    this.tiketForm.get('startDate')?.setValue(null);
  }
}
