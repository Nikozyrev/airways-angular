export interface ITicketsRequestParams {
  from: string;
  to: string;
  departure_gte: string; // start date
  departure_lte?: string; // end date
}
