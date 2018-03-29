import { Component } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import { Sensors } from '../common/interfaces/sensors.interface';
@Component()
export class FirebaseService {
  private firestore;

  constructor() {
    this.firestore = new Firestore({
      projectId: 'gardenest-db76c',
      keyFilename: 'src/firebaseModule/common/secret.json',
    });
  }
  public firestoreDb() {
    return this.firestore;
  }
}
