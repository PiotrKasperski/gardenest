import * as Rx from 'rxjs/Rx';
import { Component } from '@nestjs/common';
import * as ADC from 'mcp3008.js';
import { Observable } from 'rxjs/Observable';

@Component()
export class AnalogDigitalConverterService {
  private adc;

  constructor() {
    this.adc = new ADC();
    console.log(`adc service starts!`);
    this.getValueFromChannel(1).subscribe(val => {
      console.log(`adc val ${val}`);
    });
  }

  private bindReadCallback() {
    return Rx.Observable.bindCallback(this.adc.read);
  }
  private bindPollingCallback() {
    return Rx.Observable.bindCallback(this.adc.poll);
  }

  public getValueFromChannel(channel: number): Observable<number> {
    let bindCallback: any = this.bindReadCallback();
    return bindCallback(channel);
  }
  public startStream(channel: number, interval: number): Observable<number> {
    let bindedStream: any = this.bindPollingCallback();
    return bindedStream(channel, interval);
  }
}
