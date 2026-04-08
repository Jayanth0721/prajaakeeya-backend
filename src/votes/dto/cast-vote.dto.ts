import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CastVoteDto {
  @ApiProperty({
    description: "ID of the aspirant to vote for",
    example: 5,
    type: "integer",
  })
  @IsInt()
  aspirantId!: number;
}
