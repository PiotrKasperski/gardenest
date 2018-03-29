import * as Rx from 'rxjs/Rx';
import { Component } from '@nestjs/common';
import * as onoff from 'onoff';
@Component()
export class PumpService {
  private pumpRelayGPIOPin: number = 27;
  private relay: onoff.Gpio;

  constructor() {
    this.relay = new onoff.Gpio(this.pumpRelayGPIOPin, 'out');
  }
  private watering(time: number) {
    let timeObservable = Rx.Observable.timer(0, time)
      .timeInterval()
      .map(x => {
        this.relay.writeSync(0);
        return x.interval;
      })
      .delay(time)
      .take(1)
      .subscribe(x => {
        console.log(x);
        this.relay.writeSync(1);
      });
  }
  public wateringLiters(liters: number) {
    this.watering(60 * 60 * 1000 * liters / 110);
  }

  public wateringTime(time: number) {
    this.watering(time);
  }
}
