import { Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { InAppBrowser } from "@ionic-native/in-app-browser";

@Injectable()
export class AuthService {
  API = "http://localhost:8080";

  constructor(private http: Http, private browser: InAppBrowser) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' +
      this.getToken());
  }

  signup(email: string, password: string) {
    return this.http.post(this.API + `/api/sign-up`,
      {email: email, password: password},
      {headers: new Headers({"X-Requested-With": "XMLHttpRequest"})})

      .map((response: Response) => {
          const token = response.json().access_token;
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          console.log(JSON.parse(window.atob(base64)));

          return {
            token: token,
            decoded: JSON.parse(window.atob(base64))
          };
      })

      .do(tokenData => {
          localStorage.setItem("token", tokenData.token);
      })

      .subscribe(
        response => {
            console.log('Success');
            console.log(response);
        },
        error => {
            console.log('Error');
            console.log(error.message);
      });
  }

  signinGoogle() {
    console.log('Google auth test');
    let htmlAlert;
    return this.http.get(this.API + '/api/google/authorize')
  }


  logout() {
    localStorage.removeItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLogin(): boolean {
    if (this.getToken()) {
      return true;
    }
  }

  signinGoogle() {
    console.log('testss');

    // let a = this.browser.create(this.API + '/api/google/authorize', '_self');
    // a.show();

    return this.http.get(this.API + '/api/google/authorize')
      .map((response: Response) => {
          console.log(response.text("html"));
      })

      .do(it => {
          console.log(it);

          // localStorage.setItem("token", token);
      })

      .subscribe(
      response => {
            console.log('Success');
        },
      error => {
            console.log('Error');
            console.log(error.message);
        }
    );
  }
}
