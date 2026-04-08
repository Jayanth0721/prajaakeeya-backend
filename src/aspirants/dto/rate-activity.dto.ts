import { IsInt, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RateActivityDto {
  @ApiProperty({ example: 4, description: "Rating from 1 to 5" })
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;
}
