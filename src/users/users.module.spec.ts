import "reflect-metadata";
import { MODULE_METADATA } from "@nestjs/common/constants";

import { UsersModule } from "./users.module";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

describe("UsersModule", () => {
  it("should define UsersService as a provider", () => {
    const providers =
      Reflect.getMetadata(MODULE_METADATA.PROVIDERS, UsersModule) ?? [];

    expect(providers).toContain(UsersService);
  });

  it("should define UsersController as a controller", () => {
    const controllers =
      Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, UsersModule) ?? [];

    expect(controllers).toContain(UsersController);
  });

  it("should export UsersService", () => {
    const exportsMetadata =
      Reflect.getMetadata(MODULE_METADATA.EXPORTS, UsersModule) ?? [];

    expect(exportsMetadata).toContain(UsersService);
  });
});
