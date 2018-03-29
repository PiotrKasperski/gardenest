import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HardwareModule } from 'hardwareModule/hardware.module';
import { SensorsService } from 'hardwareModule/sensors.service';
import { FirebaseModule } from 'firebaseModule/firebase.module';
import { SensorsCollectionService } from 'firebaseModule/sensor.collection.service';
import { MenagePlantingModule } from 'menagePlantingModule/menagePlanting.module';
@Module({
  imports: [HardwareModule, FirebaseModule, MenagePlantingModule],
  controllers: [AppController],
  components: [],
})
export class AppModule {}
