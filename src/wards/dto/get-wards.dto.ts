import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetWardsDto {
  @ApiPropertyOptional({ description: 'State name to filter wards', example: 'Karnataka' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Parliamentary constituency to filter wards', example: 'Bangalore South' })
  @IsOptional()
  @IsString()
  parliamentary?: string;

  @ApiPropertyOptional({ description: 'Assembly constituency to filter wards', example: 'Jayanagar' })
  @IsOptional()
  @IsString()
  assembly?: string;
}
