import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GramaPanchayat } from "./grama-panchayat.entity";
import { GramaPanchayatService } from "./grama-panchayat.service";
import { GramaPanchayatController } from "./grama-panchayat.controller";

@Module({
  imports: [TypeOrmModule.forFeature([GramaPanchayat])],
  providers: [GramaPanchayatService],
  controllers: [GramaPanchayatController],
  exports: [GramaPanchayatService],
})
export class GramaPanchayatModule {}
