import { IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RespondVisitDto {
  @ApiProperty({
    description: 'Whether the voter will attend the visit',
    example: true
  })
  @IsBoolean()
  @IsNotEmpty()
  attending!: boolean;
}
