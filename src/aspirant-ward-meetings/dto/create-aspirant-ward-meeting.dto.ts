import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAspirantWardMeetingDto {
  @ApiProperty({
    description: "Meeting title",
    example: "Ward Townhall with voters",
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: "Meeting description",
    example: "Discuss local development plans",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Google Meet link or other meeting link",
    example: "https://meet.google.com/xyz-abcd-efg",
  })
  @IsString()
  @IsNotEmpty()
  meetingLink!: string;

  @ApiProperty({
    description: "Scheduled timestamp (milliseconds since epoch)",
    example: 1718570400000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  scheduledAt?: number;
}
