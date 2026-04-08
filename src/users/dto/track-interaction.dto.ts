import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class TrackInteractionDto {
  @ApiProperty({
    description: "Aspirant ID",
    example: 1,
  })
  @IsNumber()
  aspirantId!: number;
}
