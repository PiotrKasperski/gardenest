import { Component } from '@nestjs/common';
import { Sensors } from '../common/interfaces/sensors.interface';
import { TemperatureSensorsService } from './temperatureSensorModule/temperatureSensor.service';
import { AnalogDigitalConverterService } from './analogDigitalConverterModule/adconverter.service';
import { MoistureSensorService } from './analogDigitalConverterModule/moistureSensor.service';
import * as Rx from 'rxjs/Rx';
import { WaterlevelSensorService } from './analogDigitalConverterModule/waterlevelSensor.service';
import { Observable } from 'rxjs/Observable';
@Component()
export class SensorsService {
  constructor(
    private readonly temperatureSensorService: TemperatureSensorsService,
    private readonly moistureSensorService: MoistureSensorService,
    private readonly waterlevelSensorService: WaterlevelSensorService,
  ) {
    this.moistureSensorService.getMoistureValue().subscribe(v => {
      console.log(`moisture value ${v}`);
    });
    this.waterlevelSensorService.getWaterLevel().subscribe(value => {
      console.log(`waterlevelSensor value ${value}`);
    });
    this.waterlevelSensorService.isWater().subscribe(state => {
      console.log(`isWater ${state}`);
    });
  }

  public getSensorsValue(): Observable<Sensors> {
    return Rx.Observable.combineLatest(
      this.temperatureSensorService.getTemperatureSensorValueObservable(),
      this.moistureSensorService.getMoistureValue(),
      this.waterlevelSensorService.getWaterLevel(),
    ).map(sensorsValues => {
      let sensors: Sensors = {
        moistureSensorState: sensorsValues[1],
        tempertureSensorState: sensorsValues[0],
        waterLevelsensorState: sensorsValues[2],
      };
      return sensors;
    });
  }
  public canWatering(): Observable<boolean> {
    return Observable.combineLatest(
      this.waterlevelSensorService.isWater(),
      this.moistureSensorService.isWet(),
    ).map(states => {
      return states[0] && !states[1];
    });
  }
}
