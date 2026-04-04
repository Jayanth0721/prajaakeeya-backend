import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Election } from './election.entity';
import { ElectionsService } from './elections.service';
import { ElectionsController } from './elections.controller';
import { GeographyModule } from '../geography/geography.module';
import { WardsModule } from '../wards/wards.module';
import { GramaPanchayatModule } from '../grama-panchayat/grama-panchayat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Election]),
    GeographyModule,
    WardsModule,
    GramaPanchayatModule,
  ],
  providers: [ElectionsService],
  controllers: [ElectionsController],
  exports: [ElectionsService],
})
export class ElectionsModule {}
