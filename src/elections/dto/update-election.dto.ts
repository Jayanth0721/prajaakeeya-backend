import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateElectionDto {
  @ApiPropertyOptional({
    description: "Display name",
    example: "Municipal Corporation (Corporator)",
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ description: "Municipality scope", example: "GBA" })
  @IsString()
  @IsOptional()
  scope?: string;
}
