import { Get, Controller } from '@nestjs/common';
import { SensorsService } from './hardwareModule/sensors.service';
import { SensorsCollectionService } from 'firebaseModule/sensor.collection.service';
import { Observable } from 'rxjs';
import { MenagePlantingService } from 'menagePlantingModule/menagePlanting.service';

@Controller()
export class AppController {
  private sensorsValues;
  constructor(
    private readonly sensorService: SensorsService,
    private readonly sensorsFbService: SensorsCollectionService,
    private readonly menagePlantingService: MenagePlantingService,
  ) {
    let interval = Observable.interval(3000)
      .switchMap(event => sensorService.getSensorsValue())
      .subscribe(valu => {
        this.sensorsValues = valu;
        this.sensorsFbService.updateSensors(valu);
      });
    menagePlantingService.startMenaging();
  }
  @Get()
  root(): string {
    return JSON.stringify(this.sensorsValues);
  }
}
