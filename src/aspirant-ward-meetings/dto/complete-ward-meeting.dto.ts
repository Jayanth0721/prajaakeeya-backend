import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CompleteWardMeetingDto {
  @ApiProperty({
    description: "Notes for the meeting",
    example: "Discussed XYZ; action items assigned.",
  })
  @IsString()
  @IsNotEmpty()
  notes!: string;
}
