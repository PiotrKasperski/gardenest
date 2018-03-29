import { Component } from '@nestjs/common';
import * as fs from 'fs';
import { TemperatureFileService } from './tempSensorFile.service';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
@Component()
export class TemperatureSensorsService {
  private filePath = `/home/klonek/development/gardenjs/gardenjs/gardenest/src/hardwareModule/temperatureSensorModule/temperatureSensorFile.mock`;
  private sensorAddress = '28-00000a049409';
  private fileObservable: Rx.Observable<void>;
  constructor(private readonly fileService: TemperatureFileService) {
    this.fileService.sensorValueObservable().subscribe(data => {
      console.log(data);
    });
    /* this.fileService.watchSensorValueChangeObservable().subscribe(temp => {
            console.log(`watcher work`, temp);
        }) */
  }
  public temperatureSensorValue() {
    return this.fileService.getSensorValue();
  }
  public getTemperatureSensorValueObservable(): Observable<number> {
    return this.fileService.sensorValueObservable();
  }
}
