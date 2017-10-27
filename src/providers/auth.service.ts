
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
    private user: Observable<firebase.User>;

    constructor(public afAuth: AngularFireAuth) {
        this.user = afAuth.authState;
    }

    loginUser(newEmail: string, newPassword: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    }

    signupUser(newEmail: string, newPassword: string): Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(newEmail, newPassword);
    }

    getCurrentUser() {
        return this.user;
    }

    logoutUser(): Promise<any> {
        return this.afAuth.auth.signOut();
    }
}