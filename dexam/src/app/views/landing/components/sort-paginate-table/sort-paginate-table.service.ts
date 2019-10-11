import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Opportunity} from "../opportunity/opportunity";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {SessionData} from "./sort-paginate-table.component";

@Injectable({
  providedIn: 'root'
})
export class SortPaginateTableService {

  constructor(private http: HttpClient) { }
  list() {
    // TODO: send the message _after_ fetching the sessions
    return this.http.get('/api/v1/session');
  }

  acceptOpportunity (sessionData: SessionData): Observable<SessionData> {
    return this.http.patch<SessionData>(sessionData.resource_uri, sessionData);
    // .pipe(
    //     catchError(err => {return Observable<>;};)
    // );
  }

  setUserSessionDetails() {
    // TODO: send the message _after_ fetching the sessions
    return this.http.get('/api/v1/user/user_session_details');
  }
}
