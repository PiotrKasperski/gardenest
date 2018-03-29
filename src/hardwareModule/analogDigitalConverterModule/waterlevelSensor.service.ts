import { Component } from '@nestjs/common';
import { AnalogDigitalConverterService } from './adconverter.service';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';

export class WaterlevelSensorService {
  private readonly adcChannels: Array<number> = [1, 2, 3, 4, 5, 6, 7];
  private readonly adcService: AnalogDigitalConverterService = new AnalogDigitalConverterService();
  private levelsValueObservable: Observable<Array<number>>;

  constructor() {}

  private setChannels(): Observable<Array<number>> {
    let observableArray: Array<Observable<number>> = [];
    this.adcChannels.forEach((channel, index) => {
      observableArray.push(this.adcService.getValueFromChannel(channel));
    });
    return Rx.Observable.combineLatest(observableArray);
  }

  private getBooleanWaterlevelState(): Observable<Array<boolean>> {
    return this.setChannels().map(values => {
      return this.setBooleanState(values);
    });
  }
  private setBooleanState(stateArray: Array<number>): Array<boolean> {
    let tmpArray: Array<boolean> = [];
    stateArray.forEach((value, index) => {
      tmpArray.push(value > 0);
    });
    return tmpArray;
  }
  private setWaterlevelState(stateArray: Array<boolean>): number {
    let tmpState: number = 0;
    stateArray.forEach(state => {
      tmpState += state ? 1 : 0;
    });
    return tmpState;
  }
  public getWaterLevel(): Observable<number> {
    return this.getBooleanWaterlevelState().map(booleanStates => {
      return this.setWaterlevelState(booleanStates);
    });
  }
  public isWater(): Observable<boolean> {
    return this.getBooleanWaterlevelState().map(states => {
      return states.reduce((sum, next) => sum || next);
    });
  }
}
