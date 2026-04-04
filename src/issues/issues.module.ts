import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue } from './issue.entity';
import { HandRaise } from './hand-raise.entity';
import { WardsModule } from '../wards/wards.module';
import { UsersModule } from '../users/users.module';
import { ElectionsModule } from '../elections/elections.module';

@Module({
  imports: [TypeOrmModule.forFeature([Issue, HandRaise]), WardsModule, UsersModule, ElectionsModule],
  providers: [IssuesService],
  controllers: [IssuesController],
  exports: [IssuesService]
})
export class IssuesModule {}
