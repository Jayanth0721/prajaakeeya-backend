import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateElectionDto {
  @ApiProperty({ description: 'Election type key', example: 'municipal_corporation' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ description: 'Display name', example: 'Municipal Corporation (Corporator)' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ description: 'Municipality scope (e.g. GBA)', example: 'GBA' })
  @IsString()
  @IsOptional()
  scope?: string;
}
