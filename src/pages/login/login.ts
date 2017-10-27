import { AuthService } from './../../providers/auth.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../../validators/email';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
  loading: Loading;
  public loginForm: FormGroup;

  constructor(public navCtrl: NavController,
              private loadingCtrl: LoadingController,
              public formBuilder: FormBuilder,
              public authService: AuthService) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(30), Validators.required])]
    });
  }
  ionViewWillEnter() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user != null) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public loginUser() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });

    this.loading.present();
    
    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((user) => {
      this.navCtrl.pop();
      this.loading.dismiss();
    });
  }
}
