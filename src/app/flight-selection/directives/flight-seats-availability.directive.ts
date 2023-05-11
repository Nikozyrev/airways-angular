import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { ITicketSeats } from '../models/ticket.model';

@Directive({
  selector: '[appFlightSeatsAvailability]',
})
export class FlightSeatsAvailabilityDirective implements OnInit, OnChanges {
  @Input() public appFlightSeatsAvailability!: ITicketSeats | null;

  private colors = ['green', 'orange', 'red'] as const;

  private element: HTMLElement;

  constructor(private el: ElementRef<HTMLElement>) {
    this.element = this.el.nativeElement;
  }

  public ngOnInit(): void {
    this.applyColor();
  }

  public ngOnChanges() {
    this.replaceColor();
  }

  private replaceColor() {
    this.element.classList.remove(...this.colors);
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
    if (this.appFlightSeatsAvailability.available <= 10) return this.colors[2];
    if (
      this.appFlightSeatsAvailability.available /
        this.appFlightSeatsAvailability.total <=
      0.5
    )
      return this.colors[1];
    return this.colors[0];
  }
}
