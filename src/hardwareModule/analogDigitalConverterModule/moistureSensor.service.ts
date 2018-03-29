import { Component } from '@nestjs/common';
import { AnalogDigitalConverterService } from './adconverter.service';
import { Observable } from 'rxjs/Observable';

@Component()
export class MoistureSensorService {
  private readonly adcChannel = 0;
  private readonly minWet = 70;

  constructor(private readonly adcService: AnalogDigitalConverterService) {}

  public getMoistureValue(): Observable<number> {
    return this.adcService.getValueFromChannel(this.adcChannel).map(value => {
      return (1023 - value) * 100 / 1023;
    });
  }
  public isWet(): Observable<boolean> {
    return this.getMoistureValue().map(value => {
      return value > this.minWet;
    });
  }
}
