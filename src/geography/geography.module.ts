import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { State } from "./state.entity";
import { Parliamentary } from "./parliamentary.entity";
import { Assembly } from "./assembly.entity";
import { Municipality } from "./municipality.entity";
import { GeographyService } from "./geography.service";
import { ParliamentaryService } from "./parliamentary.service";
import { AssemblyService } from "./assembly.service";
import { MunicipalityService } from "./municipality.service";
import { GeographyController } from "./geography.controller";
import { ParliamentaryController } from "./parliamentary.controller";
import { AssemblyController } from "./assembly.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([State, Parliamentary, Assembly, Municipality]),
  ],
  providers: [
    GeographyService,
    ParliamentaryService,
    AssemblyService,
    MunicipalityService,
  ],
  controllers: [
    GeographyController,
    ParliamentaryController,
    AssemblyController,
  ],
  exports: [
    GeographyService,
    ParliamentaryService,
    AssemblyService,
    MunicipalityService,
  ],
})
export class GeographyModule {}
