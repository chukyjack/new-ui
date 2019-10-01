import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Student} from "./student";

@Injectable({
  providedIn: 'root'
})
export class StudentListService {

  constructor(private http: HttpClient) { }
  list(): Observable<Student[]> {
    // TODO: send the message _after_ fetching the sessions
    return this.http.get<Student[]>('/api/v1/user');
  }
}
