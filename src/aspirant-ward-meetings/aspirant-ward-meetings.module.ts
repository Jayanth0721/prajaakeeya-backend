import { Module } from "@nestjs/common";
import { AspirantWardMeetingsService } from "./aspirant-ward-meetings.service";
import { AspirantWardMeetingsController } from "./aspirant-ward-meetings.controller";
import { WardsModule } from "../wards/wards.module";
import { AspirantsModule } from "../aspirants/aspirants.module";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [WardsModule, AspirantsModule, UsersModule],
  providers: [AspirantWardMeetingsService],
  controllers: [AspirantWardMeetingsController],
})
export class AspirantWardMeetingsModule {}
