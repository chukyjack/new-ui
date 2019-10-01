import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Opportunity} from '../opportunity/opportunity';

@Injectable({
  providedIn: 'root'
})
export class ScheduleListService {

  constructor(private http: HttpClient) { }
  list(): Observable<Opportunity[]> {
    // TODO: send the message _after_ fetching the sessions
    return this.http.get<Opportunity[]>('/api/v1/session');
  }
}
