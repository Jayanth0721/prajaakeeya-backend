import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SetVotingWindowDto {
  @ApiProperty({
    description:
      "ID of the election this voting window is for (from GET /elections)",
    example: 3,
  })
  @IsInt()
  @IsNotEmpty()
  electionId!: number;

  @ApiProperty({
    description: "Voting window start time (Unix timestamp in milliseconds)",
    example: 1718000000000,
  })
  @IsNumber()
  @IsNotEmpty()
  startTime!: number;

  @ApiProperty({
    description: "Voting window end time (Unix timestamp in milliseconds)",
    example: 1718604800000,
  })
  @IsNumber()
  @IsNotEmpty()
  endTime!: number;

  @ApiPropertyOptional({
    description: "Description of the voting window",
    example: "General election voting period",
  })
  @IsString()
  @IsOptional()
  description?: string;
}
