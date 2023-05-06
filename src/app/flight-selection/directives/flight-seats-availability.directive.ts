import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ITicketSeats } from '../models/ticket.model';

@Directive({
  selector: '[appFlightSeatsAvailability]',
})
export class FlightSeatsAvailabilityDirective implements OnInit {
  @Input() public appFlightSeatsAvailability!: ITicketSeats | null;

  private element: HTMLElement;

  constructor(private el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }

  public ngOnInit(): void {
    this.applyColor();
  }

  private applyColor() {
    const color = this.pickColor();
    if (color) {
      this.element.classList.add(color);
    }
  }

  private pickColor() {
    if (!this.appFlightSeatsAvailability) return '';
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
