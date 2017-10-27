import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { PotHole } from './../models/pothole';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class PotholesService {
    private potholesCollection: AngularFirestoreCollection<PotHole>;
    potholes: Observable<PotHole[]>;
    
    constructor(public afAuth: AuthService, private afDB: AngularFirestore) {
        this.potholesCollection = afDB.collection<PotHole>('potholes');
        this.potholes = this.potholesCollection.snapshotChanges().map(actions => {
            return actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data } as PotHole;
            });
        });
    }

    getAll() {
        return this.potholes;
    }

    addPothole(pothole: PotHole) {
        pothole.patched = pothole.patched || false;
        pothole.verified = pothole.verified || false;
        
        this.potholesCollection.add(pothole);
    }

    updatePothole(pothole: PotHole) {
        pothole.patched = pothole.patched || false;
        pothole.verified = pothole.verified || false;

        this.potholesCollection.doc(pothole.id).update(pothole);
    }
}