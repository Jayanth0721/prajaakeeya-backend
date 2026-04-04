import { Module } from '@nestjs/common';
import { VerificationController } from './verification.controller';
import { VerificationService } from './verification.service';
import { VoterRollModule } from '../voter-roll/voter-roll.module';
import { WardsModule } from '../wards/wards.module';

@Module({
  imports: [VoterRollModule, WardsModule],
  controllers: [VerificationController],
  providers: [VerificationService]
})
export class VerificationModule {}
