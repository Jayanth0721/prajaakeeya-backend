import { IsString, IsOptional, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateWardMeetingDto {
  @ApiProperty({
    description: "Meeting title",
    example: "Weekly Ward Meeting",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: "Meeting description",
    example: "Discussion on ward development",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: "Google Meet link or other meeting link",
    example: "https://meet.google.com/xyz-abcd-efg",
    required: false,
  })
  @IsString()
  @IsOptional()
  meetingLink?: string;

  @ApiProperty({
    description: "Scheduled timestamp (milliseconds since epoch)",
    example: 1718570400000,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  scheduledAt?: number;

  @ApiProperty({
    description: "Active status",
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
