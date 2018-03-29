import * as Rx from 'rxjs/Rx';
import { Component } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SensorsService } from 'hardwareModule/sensors.service';
import { PumpService } from 'hardwareModule/pump.service';
@Component()
export class MenagePlantingService {
  constructor(
    private sensorsService: SensorsService,
    private pumpService: PumpService,
  ) {}

  private loop(intervalTime: number) {
    let interval = Observable.interval(intervalTime);
    interval
      .switchMap(event => this.sensorsService.canWatering())
      .subscribe(canWatering => {
        if (canWatering) this.pumpService.wateringTime(2000);
      });
  }
  public startMenaging() {
    this.loop(20000);
  }
}
