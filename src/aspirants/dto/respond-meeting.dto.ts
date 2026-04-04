import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RespondMeetingDto {
  @ApiProperty({
    description: 'Whether the voter will attend the meeting',
    example: true
  })
  @IsBoolean()
  @IsNotEmpty()
  attending!: boolean;
}
