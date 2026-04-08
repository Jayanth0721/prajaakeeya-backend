import "reflect-metadata";
import { MODULE_METADATA } from "@nestjs/common/constants";

import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./strategies/jwt.strategy";

describe("AuthModule", () => {
  it("should define AuthController", () => {
    const controllers =
      Reflect.getMetadata(MODULE_METADATA.CONTROLLERS, AuthModule) ?? [];

    expect(controllers).toContain(AuthController);
  });

  it("should register AuthService and JwtStrategy providers", () => {
    const providers =
      Reflect.getMetadata(MODULE_METADATA.PROVIDERS, AuthModule) ?? [];

    expect(providers).toContain(AuthService);
    expect(providers).toContain(JwtStrategy);
  });

  it("should export JwtStrategy", () => {
    const exportsMetadata =
      Reflect.getMetadata(MODULE_METADATA.EXPORTS, AuthModule) ?? [];

    expect(exportsMetadata).toContain(JwtStrategy);
  });
});
