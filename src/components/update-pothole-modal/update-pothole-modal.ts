import { PotHole } from './../../models/pothole';
import { NavParams, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the AddPotholeModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'update-pothole-modal',
  templateUrl: 'update-pothole-modal.html'
})
export class UpdatePotholeModalComponent {

  pothole: PotHole;
  severity: string = 'minor';

  constructor(params: NavParams, public viewCtrl: ViewController) {
    this.pothole = params.get('pothole');
  }

  onVerifiedChanged(event) {
    this.pothole.verified = event.checked;
  }

  onPatchedChanged(event) {
    this.pothole.patched = event.checked;
  }

  savePothole() {
    this.viewCtrl.dismiss(this.pothole);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
