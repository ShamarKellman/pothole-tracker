import { UpdatePotholeModalComponent } from './../components/update-pothole-modal/update-pothole-modal';
import { AddPotholeModalComponent } from './../components/add-pothole-modal/add-pothole-modal';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from "@ionic-native/geolocation";

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AuthService } from './../providers/auth.service';
import { PotholesService } from './../providers/potholes.service';

import { MyApp } from './app.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBrdTrFeHmSK4K2BLS3bjJCmLV24QNI8wM",
  authDomain: "pothole-tracker-1507339151430.firebaseapp.com",
  databaseURL: "https://pothole-tracker-1507339151430.firebaseio.com",
  projectId: "pothole-tracker-1507339151430",
  storageBucket: "pothole-tracker-1507339151430.appspot.com",
  messagingSenderId: "98928318433"
};

@NgModule({
  declarations: [
    MyApp,
    AddPotholeModalComponent,
    UpdatePotholeModalComponent
  ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyCc190r5qqzl7STMce2uQl4UyiB5t4rsl8'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPotholeModalComponent,
    UpdatePotholeModalComponent
  ],
  providers: [
    PotholesService,
    AuthService,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
