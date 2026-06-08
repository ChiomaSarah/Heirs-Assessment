import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private _httpclient: HttpClient,
    private _coreService: CoreService
  ) { }

  getUsers(): Observable<any> {
    return this._httpclient
      .get('https://randomuser.me/api/?results=100')
      .pipe(
        timeout(10000),
        retry({
          count: 2,
          delay: (_error, retryCount) => timer(1000 * Math.pow(2, retryCount - 1))
        }),
        catchError((error) => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Network error. Please check your connection.';
      this._coreService.openSnackBar(errorMessage, 'Retry');
    } else {
      switch (error.status) {
        case 0:
          errorMessage = 'Cannot reach the server. Check your connection.';
          break;
        case 404:
          errorMessage = 'Service temporarily unavailable';
          break;
        case 429:
          errorMessage = 'Too many requests. Please wait a moment.';
          break;
        default:
          errorMessage = `Server error: ${error.status}. Please try again.`;
      }

      this._coreService.openSnackBar(errorMessage, 'Dismiss');
    }

    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }
}