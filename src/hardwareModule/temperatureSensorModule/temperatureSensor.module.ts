import { Module } from '@nestjs/common';
import { TemperatureSensorsService } from './temperatureSensor.service';
import { TemperatureFileService } from './tempSensorFile.service';
@Module({
  components: [TemperatureSensorsService, TemperatureFileService],
  exports: [TemperatureSensorsService],
})
export class TemperatureSensorModule {}
