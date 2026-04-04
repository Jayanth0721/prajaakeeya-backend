import { IsArray, ArrayNotEmpty, IsInt, IsOptional } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class DeleteVisitsDto {
  @ApiPropertyOptional({ description: 'Array of visit IDs to delete (bulk)', example: [5, 6] })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  visitIds?: number[];

  @ApiPropertyOptional({ description: 'Single visit ID to delete (path preferred)', example: 5 })
  @IsInt()
  @IsOptional()
  visitId?: number;
}
