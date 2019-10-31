import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log(username+ ' '+ password)
    return this.http.post('/api/v1/user/login/', {
      username: username,
      password: password
    });
  }
}

class LoginSessionDetails {
  user_id: number;
  username: string;
  toke: string;
}
