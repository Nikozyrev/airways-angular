import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Toppings } from '../../../flight-search/components/flight-search/flight-search.component';
import { selectTicket } from '../../../flight-search/store/selectors/tiket.selector';
import { dateValidator } from '../../validators/date.validator';
import { tiketValidator } from '../../validators/tiket.validator';
import { HttpClient } from '@angular/common/http';
import { TicketStateInterface } from '../../../flight-search/store/tiket.state.model';
import { setTicketInfoSuccess } from '../../../flight-search/store/actions/tiket.action';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../common/routes.constants';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent implements OnInit, OnDestroy {
  public ticketSub: Subscription | undefined;

  ticketsAmount = 0;

  startDate = '';

  endDate = '';

  from = '';

  to = '';

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

  countries = [''];

  toppings = new FormControl(['Adult']);

  ticketForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required, dateValidator]),
    endDate: new FormControl(''),
    toppings: new FormControl(this.toppingsObj, [tiketValidator]),
  });

  formTouched = false;

  dateTouched = false;

  editActive = false;

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router
  ) {}

  checkPage() {
    return this.router.url.slice(1) === AppRoutes.flights ? true : false;
  }

  ngOnInit() {
    const ticket$ = this.store.select(selectTicket);
    this.ticketSub = ticket$.subscribe((val: TicketStateInterface) => {
      this.ticketForm.get('from')?.setValue(val.from);
      this.ticketForm.get('to')?.setValue(val.to);
      this.from = val.from;
      this.to = val.to;
      this.ticketForm.get('startDate')?.setValue(val.startDate);
      this.ticketForm
        .get('endDate')
        ?.setValue(val.endDate ? val.endDate : val.startDate);
      this.startDate = val.startDate as string;
      this.endDate = val.endDate ? val.endDate : this.startDate;
      this.ticketsAmount = this.countTickets(val.toppings);
      this.toppings.setValue(
        val.toppings
          .filter((toppings) => toppings.amount > 0)
          .map((toppings) => toppings.type)
      );
      this.toppingsObj = val.toppings;
      this.ticketForm.get('toppings')?.setValue(this.toppingsObj);
    });

    this.http.get<string[]>('/cities').subscribe((cities) => {
      this.countries = cities;
    });

    this.ticketForm.valueChanges.subscribe((value) => {
      if (this.formTouched) {
        this.onFormChange(value as TicketStateInterface);
      }
    });
  }

  ngOnDestroy(): void {
    this.ticketSub?.unsubscribe();
  }

  increase(event: Event) {
    localStorage.removeItem('keyFormValue');
    this.formTouched = true;
    const elValue = (event.target as HTMLElement)
      .nextElementSibling as HTMLElement;
    const value = Number(elValue.innerHTML) + 1;
    elValue.innerHTML = value.toString();
    const ticketName = (
      ((event.target as HTMLElement).parentElement as HTMLElement)
        .previousElementSibling as HTMLElement
    ).textContent as string;
    const array = this.toppings.value;
    if (!array?.includes(ticketName)) {
      array?.push(ticketName);
    }

    this.toppings.patchValue(array);

    const newToppings = this.toppingsObj.map((val) => {
      if (val.type === ticketName) {
        return { ...val, amount: value };
      }
      return val;
    });
    this.toppingsObj = newToppings;

    this.ticketForm.get('toppings')?.setValue(newToppings);
  }

  decrease(event: Event) {
    localStorage.removeItem('keyFormValue');
    this.formTouched = true;
    const elValue = (event.target as HTMLElement)
      .previousElementSibling as HTMLElement;
    let value = elValue.innerHTML;
    if (+value > 0) {
      value = (+value - 1).toString();
    }
    elValue.innerHTML = value;

    const ticketName = (
      ((event.target as HTMLElement).parentElement as HTMLElement)
        .previousElementSibling as HTMLElement
    ).textContent as string;
    const array = this.toppings.value;

    if (+value === 0) {
      const filterArray = (array as string[]).filter((el) => el !== ticketName);
      this.toppings.setValue(filterArray);
    }

    const newToppings = this.toppingsObj.map((val) => {
      if (val.type === ticketName) {
        return { ...val, amount: +value };
      }
      return val;
    });
    this.toppingsObj = newToppings;

    this.ticketForm.get('toppings')?.setValue(this.toppingsObj);
  }

  countTickets(toppings: Toppings[]) {
    let counter = 0;
    toppings.forEach((val) => {
      counter += val.amount;
    });
    return counter;
  }

  onFormClick() {
    if (this.dateTouched) {
      const startDate = this.ticketForm.get('startDate')?.value;
      const endDate = this.ticketForm.get('endDate')?.value;

      if (startDate && endDate) {
        this.onFormChange(this.ticketForm.value as TicketStateInterface);
      }
    }
  }

  onFormChange(value: TicketStateInterface) {
    this.store.dispatch(
      setTicketInfoSuccess({
        ticketInfo: value,
      })
    );
    this.dateTouched = false;
    this.formTouched = false;
  }
}
