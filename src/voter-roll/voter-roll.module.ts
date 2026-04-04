import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoterRollService } from './voter-roll.service';
import { VoterRollController } from './voter-roll.controller';
import { Voter } from './voter.entity';
import { WardsModule } from '../wards/wards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Voter]), WardsModule],
  providers: [VoterRollService],
  controllers: [VoterRollController],
  exports: [VoterRollService]
})
export class VoterRollModule {}
