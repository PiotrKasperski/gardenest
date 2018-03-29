import { Module } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { TemperatureSensorModule } from './temperatureSensorModule/temperatureSensor.module';
import { AnalogDigitalConverterModule } from './analogDigitalConverterModule/analogDigitalConverter.module';
import { AnalogDigitalConverterService } from './analogDigitalConverterModule/adconverter.service';
import { PumpService } from './pump.service';
@Module({
  imports: [TemperatureSensorModule, AnalogDigitalConverterModule, PumpService],
  components: [SensorsService],
  exports: [SensorsService, PumpService],
})
export class HardwareModule {}
