import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _httpclient: HttpClient) {}

  addEmployee(data: any): Observable<any> {
    return this._httpclient.post(
      'https://random-data-api.com/api/v2/users',
      data
    );
  }

  getEmployees(): Observable<any> {
    return this._httpclient.get(
      'https://random-data-api.com/api/v2/users?size=100'
    );
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._httpclient.patch(
      `https://random-data-api.com/api/v2/users/${id}`,
      data
    );
  }

  deleteEmployee(id: number): Observable<any> {
    return this._httpclient.delete(
      `https://random-data-api.com/api/v2/users/${id}`
    );
  }
}
