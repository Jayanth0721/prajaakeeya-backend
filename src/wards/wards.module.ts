import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardsService } from './wards.service';
import { WardsController } from './wards.controller';
import { Ward } from './ward.entity';
import { WardMeeting } from './ward-meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ward, WardMeeting])],
  providers: [WardsService],
  controllers: [WardsController],
  exports: [WardsService]
})
export class WardsModule {}
