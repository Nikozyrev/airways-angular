import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setTiketInfoSuccess } from '../../store/actions/tiket.action';
import { TiketStateInterface } from '../../store/tiket.state.model';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {
  selectedType!: string;

  tripType: string[] = ['Round Trip', 'One Way'];

  fromValue!: string;

  toValue!: string;

  destinationValue!: string;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  date = new FormControl(new Date());

  serializedDate = new FormControl(new Date().toISOString());

  selectedValue!: string;

  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  toppings!: string;

  selectedToppings = ['Adult', 'Child'];

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedType = this.tripType[0];
  }

  change() {
    const from = this.fromValue;
    this.fromValue = this.toValue;
    this.toValue = from;
  }

  submit() {
    const tiketInfo: TiketStateInterface = {
      tripType: this.selectedType,
      from: this.fromValue,
      to: this.toValue,
      date:
        this.selectedType === 'Round Trip' ? this.range.value : this.date.value,
      toppings: [this.toppings],
    };
    this.store.dispatch(setTiketInfoSuccess({ tiketInfo: tiketInfo }));
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
    this.toppings = tiketName;

    console.log(this.toppings);
  }

  decrease(event: Event) {
    const elValue = (event.target as HTMLElement)
      .previousElementSibling as HTMLElement;
    const value = elValue.innerHTML;
    if (+value > 0) {
      elValue.innerHTML = (+value - 1).toString();
    }
  }
}
