import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _httpclient: HttpClient) {}

  getUsers(): Observable<any> {
    return this._httpclient.get(
      'https://random-data-api.com/api/v2/users?size=100'
    );
  }
}
