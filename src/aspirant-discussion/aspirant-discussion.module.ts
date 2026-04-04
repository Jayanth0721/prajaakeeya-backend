import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AspirantDiscussionMessage } from './aspirant-discussion-message.entity';
import { AspirantDiscussionService } from './aspirant-discussion.service';
import { AspirantDiscussionController } from './aspirant-discussion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AspirantDiscussionMessage])],
  providers: [AspirantDiscussionService],
  controllers: [AspirantDiscussionController],
  exports: [AspirantDiscussionService],
})
export class AspirantDiscussionModule {}
