import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { IFlightSeats } from '../models/flight.model';

@Directive({
  selector: '[appFlightSeatsAvailability]',
})
export class FlightSeatsAvailabilityDirective implements OnInit {
  @Input() public appFlightSeatsAvailability!: IFlightSeats;

  private element: HTMLElement;

  constructor(private el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }

  public ngOnInit(): void {
    this.applyColor();
  }

  private applyColor() {
    const color = this.pickColor();
    this.element.classList.add(color);
  }

  private pickColor() {
    if (this.appFlightSeatsAvailability.available <= 10) return 'red';
    if (
      this.appFlightSeatsAvailability.available /
        this.appFlightSeatsAvailability.total <=
      0.5
    )
      return 'orange';
    return 'green';
  }
}
