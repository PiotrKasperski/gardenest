import { Component } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { Sensors } from '../common/interfaces/sensors.interface';

@Component()
export class SensorsCollectionService {
  private collection;
  private rpiSensorsRef;

  constructor(private readonly firebaseService: FirebaseService) {
    this.collection = firebaseService.firestoreDb().collection('sensors');
    this.rpiSensorsRef = this.collection.doc('rpi-sensors-value');
  }

  public updateSensors(sensorsValues: Sensors) {
    return this.rpiSensorsRef.update(sensorsValues);
  }
}
