import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vote } from "./vote.entity";
import { VotingWindow } from "./voting-window.entity";
import { VotesService } from "./votes.service";
import { VotesController } from "./votes.controller";
import { UsersModule } from "../users/users.module";
import { WardsModule } from "../wards/wards.module";
import { AspirantsModule } from "../aspirants/aspirants.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote, VotingWindow]),
    UsersModule,
    WardsModule,
    forwardRef(() => AspirantsModule),
  ],
  providers: [VotesService],
  controllers: [VotesController],
  exports: [VotesService],
})
export class VotesModule {}
