import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import {Router} from '@angular/router';
import {LoginService} from "./login.service";
import {SessionTokenService} from "./session-token.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
  public username;
  public password;

  constructor(private api: LoginService, private sessionToken: SessionTokenService, private router: Router) { }

  ngOnInit() {
  }

  tryLogin() {
    this.api.login(
        this.username,
        this.password
    ).subscribe(
            r => {
              console.log(r);
              if (r.token) {
                this.sessionToken.setToken(r.token);
                if (r.role === 'tutor') {
                    this.router.navigateByUrl('/landing/opportunities');
                } else if (r.role === 'student') {
                      this.router.navigateByUrl('/landing/schedule');
                  } else {
                    this.router.navigateByUrl('/landing/v9');
                }
              }
            },
            r => {
              alert(r.error.error);
            });
  }

}
