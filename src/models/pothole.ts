import firebase from "firebase";

export interface PotHole {
    id?: string;
    coordinates: firebase.firestore.GeoPoint;
    user: string;
    severity: string;
    patched?: boolean;
    verified?: boolean;
    userUpdated?: string;
}