import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ITicket, ITicketResponse } from '../models/ticket.model';
import { ITicketsRequestParams } from '../models/request-params.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private endpoints = {
    tickets: '/tikets/',
  };

  constructor(private http: HttpClient) {}

  public getTickets(params?: ITicketsRequestParams) {
    let urlParams = new HttpParams();
    if (params) {
      urlParams = urlParams.append('from', params.from);
      urlParams = urlParams.append('to', params.to);
      urlParams = urlParams.append('departure_gte', params.departure_gte);
      if (params.departure_lte) {
        urlParams = urlParams.append('departure_lte', params.departure_lte);
      }
    }
    return this.http
      .get<ITicketResponse[]>(this.endpoints.tickets, { params: urlParams })
      .pipe(map((res) => res.map(this.ticketAdapter)));
  }

  public getTwoWayTickets(params: ITicketsRequestParams) {
    const returnParams = {
      ...params,
      from: params.to,
      to: params.from,
    };
    return forkJoin({
      destinationTickets: this.getTickets(params),
      returnTickets: this.getTickets(returnParams),
    });
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
