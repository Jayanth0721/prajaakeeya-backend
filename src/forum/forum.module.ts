import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { ForumService } from "./forum.service";
import { ForumController } from "./forum.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ForumService],
  controllers: [ForumController],
  exports: [ForumService],
})
export class ForumModule {}
