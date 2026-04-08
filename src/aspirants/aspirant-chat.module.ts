import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AspirantMessage } from "./aspirant-message.entity";
import { AspirantChatService } from "./aspirant-chat.service";
import { AspirantChatController } from "./aspirant-chat.controller";

@Module({
  imports: [TypeOrmModule.forFeature([AspirantMessage])],
  providers: [AspirantChatService],
  controllers: [AspirantChatController],
  exports: [AspirantChatService],
})
export class AspirantChatModule {}
