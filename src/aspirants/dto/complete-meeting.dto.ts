import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CompleteMeetingDto {
  @ApiProperty({
    description: 'Notes or minutes of the meeting',
    example: 'Discussed road repair; follow-up actions assigned.'
  })
  @IsString()
  @IsNotEmpty()
  notes!: string;
}
