import { Pipe, PipeTransform } from '@angular/core';
import { CartListInterface } from '../store/cart.model';
import { ShoppingCartService } from '../services/shopping-cart.services';

@Pipe({
  name: 'sortCart',
})
export class SortCartPipe implements PipeTransform {
  constructor(private shoppingCartService: ShoppingCartService) {}

  transform(
    array: CartListInterface[] | null,
    sortBy: string,
    sortDirection: string
  ): any[] {
    const sortedArray = [...array!];

    sortedArray.sort((a, b) => {
      let valueA: string | number | Date = '';
      let valueB: string | number | Date = '';
      if (sortBy === 'No') {
        valueA = a.tickets.destinationTicket?.flightNum as number;
        valueB = b.tickets.destinationTicket?.flightNum as number;
      } else if (sortBy === 'Flight') {
        valueA = a.tickets.destinationTicket?.locations.departure as string;
        valueB = b.tickets.destinationTicket?.locations.departure as string;
      } else if (sortBy === 'Trip') {
        valueA = a.tickets?.returnTicket ? 0 : 1;
        valueB = b.tickets?.returnTicket ? 0 : 1;
      } else if (sortBy === 'Data') {
        valueA = a.tickets.destinationTicket?.dates.arrival as Date;
        valueB = b.tickets.destinationTicket?.dates.arrival as Date;
      } else if (sortBy === 'Price') {
        valueA = +this.shoppingCartService.countPrice(a, 'EUR');
        valueB = +this.shoppingCartService.countPrice(b, 'EUR');
      }

      if (valueA < valueB) {
        return sortDirection === 'Up' ? -1 : 1;
      } else if (valueA > valueB) {
        return sortDirection === 'Down' ? -1 : 1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  }
}
