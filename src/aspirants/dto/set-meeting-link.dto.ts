import { IsNotEmpty, IsString, IsUrl, IsInt, IsOptional, IsArray, ArrayMinSize, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SetMeetingLinkDto {
  @ApiProperty({
    description: 'Array of aspirant IDs to set meeting for',
    example: [5, 12, 23],
    type: [Number]
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  aspirantIds!: number[];

  @ApiProperty({
    description: 'Google Meet or meeting link for aspirant sessions',
    example: 'https://meet.google.com/abc-defg-hij'
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  meetingLink!: string;

  @ApiProperty({
    description: 'Scheduled time as Unix timestamp in milliseconds',
    example: 1716240000000
  })
  @IsInt()
  @IsNotEmpty()
  startTime!: number;

  @ApiPropertyOptional({
    description: 'Optional end time as Unix timestamp in milliseconds',
    example: 1716243600000
  })
  @IsInt()
  @IsOptional()
  endTime?: number;

  @ApiPropertyOptional({
    description: 'Meeting platform',
    enum: ['google_meet', 'zoom', 'instagram', 'facebook', 'others'],
    example: 'google_meet',
    default: 'others'
  })
  @IsEnum(['google_meet', 'zoom', 'instagram', 'facebook', 'others'])
  @IsOptional()
  platform?: 'google_meet' | 'zoom' | 'instagram' | 'facebook' | 'others';

  @ApiPropertyOptional({
    description: 'Title for the meeting',
    example: 'Townhall with voters'
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Short description for the meeting',
    example: 'Discuss neighbourhood development plans'
  })
  @IsString()
  @IsOptional()
  description?: string;
}
