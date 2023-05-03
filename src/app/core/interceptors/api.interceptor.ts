import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private baseURL = 'https://jsonairways.onrender.com';

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAccessToken();

    return next
      .handle(
        request.clone({
          url: `${this.baseURL}${request.url}`,
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      )
      .pipe(
        tap({
          error: (err) => {
            if (err.status === HttpStatusCode.Unauthorized) {
              this.authService.logout();
            }
          },
        })
      );
  }
}
