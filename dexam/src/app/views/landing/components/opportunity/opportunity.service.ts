import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Opportunity} from './opportunity';


@Injectable({
  providedIn: 'root'
})
export class OpportunityService {

  constructor(private http: HttpClient) { }
  list(): Observable<Opportunity[]> {
    // TODO: send the message _after_ fetching the sessions
    return this.http.get<Opportunity[]>('/api/v1/session');
  }

  updateHero (opportunity: Opportunity): Observable<Opportunity> {
    return this.http.put<Opportunity>('/api/v1/session', opportunity);
        // .pipe(
        //     catchError(this.handleError('updateHero', hero))
        // );
  }
}
