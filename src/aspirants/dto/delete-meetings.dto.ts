import { IsArray, ArrayNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteMeetingsDto {
  @ApiProperty({
    description: "Array of meeting IDs to delete",
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  meetingIds!: number[];
}
