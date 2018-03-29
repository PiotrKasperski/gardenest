import { Module } from '@nestjs/common';
import { AnalogDigitalConverterService } from './adconverter.service';
import { MoistureSensorService } from './moistureSensor.service';
import { WaterlevelSensorService } from './waterlevelSensor.service';
@Module({
  components: [
    AnalogDigitalConverterService,
    MoistureSensorService,
    WaterlevelSensorService,
  ],
  exports: [MoistureSensorService, WaterlevelSensorService],
})
export class AnalogDigitalConverterModule {}
