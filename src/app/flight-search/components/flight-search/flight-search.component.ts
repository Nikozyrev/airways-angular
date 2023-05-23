import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setTicketInfoSuccess } from '../../store/actions/tiket.action';
import { TicketStateInterface } from '../../store/tiket.state.model';
import { dateValidator } from '../../../shared/validators/date.validator';
import { tiketValidator } from '../../../shared/validators/tiket.validator';
import { selectDate } from '../../../header/store/selectors/header-selector';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { selectTicket } from '../../store/selectors/tiket.selector';
import { Subscription } from 'rxjs';
import { KeyLocalStorage } from '../../../common/passengers.constants';

export interface Toppings {
  type: string;
  amount: number;
}

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  selectedType!: string;

  tripType: string[] = ['Round Trip', 'One Way'];

  countries = [''];

  toppings = new FormControl(['Adult']);

  toppingsObj: Toppings[] = [
    {
      type: 'Adult',
      amount: 1,
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

  ticketForm = new FormGroup({
    tripType: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required, dateValidator]),
    endDate: new FormControl(''),
    toppings: new FormControl(this.toppingsObj, [tiketValidator]),
  });

  tiket$: Subscription | undefined;

  preLoad = true;

  @ViewChild('fromInput') btnInput!: ElementRef;

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<string[]>('/cities').subscribe((cities) => {
      this.countries = cities;
      this.preLoad = false;
    });

    localStorage.removeItem(KeyLocalStorage.Passengers);

    this.selectedType = this.tripType[0];

    this.tiket$ = this.store.select(selectTicket).subscribe((value) => {
      if (value.tripType !== '') {
        this.ticketForm.get('tripType')?.setValue(value.tripType);
        this.ticketForm.get('from')?.setValue(value.from);
        this.ticketForm.get('to')?.setValue(value.to);
        this.ticketForm.get('startDate')?.setValue(value.startDate);
        this.ticketForm.get('endDate')?.setValue(value.endDate);
        this.selectedType = value.tripType;
        this.toppingsObj = value.toppings;
        this.ticketForm.get('toppings')?.setValue(this.toppingsObj);
        const toppingsValue = this.toppingsObj
          .filter((v) => v.amount > 0)
          .map((el) => el.type);
        this.toppings.value?.push(...toppingsValue);
      }
    });

    const date$ = this.store.select(selectDate);
    date$.subscribe(() => {
      const endDate = this.ticketForm.get('endDate')?.value;
      const startDate = this.ticketForm.get('startDate')?.value;
      this.ticketForm.get('endDate')?.setValue(endDate as string);
      this.ticketForm.get('startDate')?.setValue(startDate as string);
    });
    this.ticketForm.get('toppings')?.markAsTouched();
  }

  ngOnDestroy(): void {
    this.tiket$?.unsubscribe();
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
    if (this.ticketForm.valid) {
      const formValue: TicketStateInterface = Object.assign(
        {},
        this.ticketForm.value as TicketStateInterface
      );
      if (this.clickCounter > 0) {
        formValue.from = this.ticketForm.get('to')?.value as string;
        formValue.to = this.ticketForm.get('from')?.value as string;
      }
      if (this.selectedType === 'Round Trip') {
        this.store.dispatch(
          setTicketInfoSuccess({
            ticketInfo: formValue,
          })
        );
      } else {
        this.store.dispatch(
          setTicketInfoSuccess({
            ticketInfo: formValue,
          })
        );
      }
      this.router.navigate(['./flights']);
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

    const newToppings = this.toppingsObj.map((val) => {
      if (val.type === tiketName) {
        return { ...val, amount: value };
      }
      return val;
    });
    this.toppingsObj = newToppings;

    this.ticketForm.get('toppings')?.setValue(newToppings);
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

    const newToppings = this.toppingsObj.map((val) => {
      if (val.type === tiketName) {
        return { ...val, amount: +value };
      }
      return val;
    });
    this.toppingsObj = newToppings;

    this.ticketForm.get('toppings')?.setValue(this.toppingsObj);
  }

  tripTypeChange() {
    this.ticketForm.get('endDate')?.setValue(null);
    this.ticketForm.get('startDate')?.setValue(null);
  }
}
