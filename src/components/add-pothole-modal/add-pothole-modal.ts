import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the AddPotholeModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-pothole-modal',
  templateUrl: 'add-pothole-modal.html'
})
export class AddPotholeModalComponent {

  location: Object;
  severity: string = 'minor';

  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.location = params.get('location');
  }

  savePothole() {
    this.viewCtrl.dismiss({ 'severity': this.severity });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
