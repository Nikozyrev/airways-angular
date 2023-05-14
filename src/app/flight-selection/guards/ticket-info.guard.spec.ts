import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { ticketInfoGuard } from './ticket-info.guard';

describe('ticketInfoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => ticketInfoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
