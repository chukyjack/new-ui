import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SortPaginateTableService {

  constructor(private http: HttpClient) { }
  list() {
    // TODO: send the message _after_ fetching the sessions
    return this.http.get('/api/v1/session');
  }
}
