import "reflect-metadata";
import { MODULE_METADATA } from "@nestjs/common/constants";

import { AspirantsModule } from "./aspirants.module";
import { AspirantsService } from "./aspirants.service";
import { AspirantsController } from "./aspirants.controller";

describe("AspirantsModule", () => {
  it("should define AspirantsService as a provider", () => {
    const providers =
      Reflect.getMetadata(MODULE_METADATA.PROVIDERS, AspirantsModule) ?? [];

    expect(providers).toContain(AspirantsService);
  });

  it("should define AspirantsController as a controller", () => {
    const controllers =
      Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, AspirantsModule) ?? [];

    expect(controllers).toContain(AspirantsController);
  });

  it("should export AspirantsService", () => {
    const exportsMetadata =
      Reflect.getMetadata(MODULE_METADATA.EXPORTS, AspirantsModule) ?? [];

    expect(exportsMetadata).toContain(AspirantsService);
  });
});
