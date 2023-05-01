import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ITicket, ITicketResponse } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private endpoints = {
    tickets: '/tikets/',
  };

  constructor(private http: HttpClient) {}

  public getTickets() {
    return this.http
      .get<ITicketResponse[]>(this.endpoints.tickets)
      .pipe(map((res) => res.map(this.ticketAdapter)));
  }

  private ticketAdapter(ticketRes: ITicketResponse): ITicket {
    return {
      flightNum: ticketRes.flightNum,
      dates: {
        arrival: new Date(ticketRes.arrival),
        departure: new Date(ticketRes.departure),
      },
      locations: {
        departure: ticketRes.from,
        arrival: ticketRes.to,
      },
      seats: ticketRes.seats,
      price: ticketRes.price,
    };
  }
}
