import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWardMeetingDto {
  @ApiProperty({
    description: 'Ward ID',
    example: 42
  })
  @IsNumber()
  @IsNotEmpty()
  wardId!: number;

  @ApiProperty({
    description: 'Meeting title',
    example: 'Weekly Ward Meeting'
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Meeting description',
    example: 'Discussion on ward development',
    required: false
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Google Meet link or other meeting link',
    example: 'https://meet.google.com/xyz-abcd-efg'
  })
  @IsString()
  @IsNotEmpty()
  meetingLink!: string;

  @ApiProperty({
    description: 'Scheduled timestamp (milliseconds since epoch)',
    example: 1718570400000,
    required: false
  })
  @IsNumber()
  @IsOptional()
  scheduledAt?: number;
}
