import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMunicipalityDto {
  @ApiProperty({
    description: "Full name of the city corporation",
    example: "Mysuru City Corporation",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ description: "State", example: "Karnataka" })
  @IsString()
  @IsOptional()
  state?: string;
}
