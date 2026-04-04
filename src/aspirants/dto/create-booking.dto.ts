import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiPropertyOptional({
    description: 'Message or reason for the visit',
    example: 'I want to discuss ward development plans'
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiPropertyOptional({
    description: 'Preferred time as Unix timestamp in milliseconds',
    example: 1716240000000
  })
  @IsInt()
  @IsOptional()
  preferredAt?: number;
}
