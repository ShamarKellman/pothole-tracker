import { AuthService } from './../../providers/auth.service';
import { Component, } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../../validators/email';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public registerForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
              public authService: AuthService,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {

    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(5), Validators.maxLength(30), Validators.required])]
    });
  }

  /**
  * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
  *  component while the user waits.
  *
  * If the form is invalid it will just log the form value, feel free to handle that as you like.
  */
  registerUser() {
    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });

    this.loading.present();
    
    if (this.registerForm.valid) {
      this.authService.signupUser(this.registerForm.value.email, this.registerForm.value.password).then((user) => {
        this.loading.dismiss();
        this.navCtrl.setRoot('HomePage');
        this.navCtrl.popToRoot();
      });
    }
  }
}