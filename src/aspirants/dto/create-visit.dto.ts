import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateVisitDto {
  @ApiProperty({
    description: "Scheduled time as Unix timestamp in milliseconds",
    example: 1716340000000,
  })
  @IsInt()
  @IsNotEmpty()
  startTime!: number;

  @ApiPropertyOptional({
    description: "Optional end time as Unix timestamp in milliseconds",
    example: 1716343600000,
  })
  @IsInt()
  @IsOptional()
  endTime?: number;

  @ApiPropertyOptional({
    description: "Title for the visit",
    example: "Ward inspection visit",
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: "Description of the visit",
    example: "Visiting ward to meet voters and discuss local issues",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: "Location of the visit",
    example: "Community Hall, Ward 42",
  })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({
    description: "Google Maps URL for the visit location",
    example: "https://maps.app.goo.gl/abcd",
  })
  @IsString()
  @IsOptional()
  googleMapsLink?: string;
}
