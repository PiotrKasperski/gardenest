import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { SensorsCollectionService } from './sensor.collection.service';

@Module({
  components: [FirebaseService, SensorsCollectionService],
  exports: [SensorsCollectionService],
})
export class FirebaseModule {}
