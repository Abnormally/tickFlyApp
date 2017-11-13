import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';

import {RegisterPage} from "../register/register";
import {AuthService} from "../../services/auth.service";
import {NgForm} from "@angular/forms";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService],
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = null;

  userData = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authService: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  onHomePage() {
    this.navCtrl.push(HomePage);
  }

  onSignup(form: NgForm) {
    console.log(form.value.email);
    console.log(form.value.password);
    this.authService.signup(form.value.email, form.value.password)
      .subscribe(
        response => {
          console.log('Success');
          this.onHomePage();
        },
        error => {
          console.log('Error');
        }
      );
  }

  signinGoogle() {
    console.log('test login');
    this.authService.signinGoogle();
  }
}
