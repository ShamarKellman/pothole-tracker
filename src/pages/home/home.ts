import { AddPotholeModalComponent } from './../../components/add-pothole-modal/add-pothole-modal';
import { UpdatePotholeModalComponent } from './../../components/update-pothole-modal/update-pothole-modal';
import { AuthService } from './../../providers/auth.service';
import { PotHole } from './../../models/pothole';
import { PotholesService } from './../../providers/potholes.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  potholes: PotHole[];
  map: any = {
    lat: 13.179565876138549,
    lng: -59.53832917968748,
    zoom: 11
  };
  markerColorMap: Object = {
    'minor': "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    'major': "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
    'extreme': "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
  };
  isLoggedIn: boolean = false;
  userUid: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private phService: PotholesService,
    private authService: AuthService,
    public modalCtrl: ModalController,
    private geolocation: Geolocation) { }

  mapClick(event) {
    if (this.isLoggedIn) {
      const addPotholeModal = this.modalCtrl.create(AddPotholeModalComponent, { 'location': event.coords });
      addPotholeModal.onDidDismiss(data => {
        if (data) {
          let pothole: PotHole = {
            coordinates: {
              latitude: event.coords.lat,
              longitude: event.coords.lng
            },
            user: this.userUid,
            userUpdated: this.userUid,
            severity: data.severity
          }

          this.phService.addPothole(pothole);
        }
      });

      addPotholeModal.present();
    }
    else {
      this.navCtrl.push('LoginPage');
    }
  }

  markerClick(ipothole: PotHole) {
    if (this.isLoggedIn) {
      const updatePotholeModal = this.modalCtrl.create(UpdatePotholeModalComponent, { 'pothole': ipothole });
      updatePotholeModal.onDidDismiss((pothole: PotHole) => {
        if (pothole) {
          pothole.userUpdated = this.userUid;
          this.phService.updatePothole(pothole);
        }
      });

      updatePotholeModal.present();
    }
    else {
      this.navCtrl.push('LoginPage');
    }
  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 120000}).then((resp) => {
      this.map.lat = resp.coords.latitude;
      this.map.lng = resp.coords.longitude;
      this.map.zoom = 18;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
    this.phService.getAll().subscribe((data: PotHole[]) => {
      this.potholes = data;
    });

    this.authService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
        this.userUid = user.uid;
      }
    });
  }

  goToLogin() {
    if (!this.isLoggedIn)
      this.navCtrl.push('LoginPage');
    else {
      this.authService.logoutUser().then(() => {
        this.isLoggedIn = false;
      });
    }
  }
}
