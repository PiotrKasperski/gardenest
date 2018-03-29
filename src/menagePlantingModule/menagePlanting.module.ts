import { Module } from '@nestjs/common';
import { MenagePlantingService } from './menagePlanting.service';
import { HardwareModule } from 'hardwareModule/hardware.module';
@Module({
  components: [MenagePlantingService],
  imports: [HardwareModule],
  exports: [MenagePlantingService],
})
export class MenagePlantingModule {}
